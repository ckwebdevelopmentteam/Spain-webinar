import { neon } from '@neondatabase/serverless';

export function getDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  return neon(dbUrl);
}

export async function initDb() {
  try {
    const sql = getDb();

    // 1. Registrations Table
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        order_id VARCHAR(255),
        payment_id VARCHAR(255),
        signature VARCHAR(512),
        amount INTEGER,
        status VARCHAR(50) DEFAULT 'completed',
        ticket_id VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Batches & Fee Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS batches (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        fee INTEGER NOT NULL DEFAULT 10000,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default batches if table is empty
    const existingBatches = await sql`SELECT COUNT(*) FROM batches;`;
    if (Number(existingBatches[0].count) === 0) {
      await sql`
        INSERT INTO batches (name, fee, description) VALUES
        ('Batch A', 10000, 'Regular AI Masterclass Batch A'),
        ('Batch B', 15000, 'Advanced Premium AI Batch B'),
        ('Batch C', 8000, 'Fast-Track Weekend Batch C');
      `;
    }

    // 3. Students Table
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        batch_name VARCHAR(100) DEFAULT 'Batch A',
        total_fee INTEGER NOT NULL DEFAULT 10000,
        paid_amount INTEGER NOT NULL DEFAULT 0,
        pending_amount INTEGER NOT NULL DEFAULT 10000,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Admin Users Table (Stores hashed admin credentials)
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(512) NOT NULL,
        salt VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default admin with password 'Sapain123' if not present
    const existingAdmin = await sql`SELECT id FROM admin_users WHERE username = 'admin' LIMIT 1;`;
    if (!existingAdmin || existingAdmin.length === 0) {
      // Import hash function dynamically or inline using Node crypto
      const cryptoModule = await import('crypto');
      const salt = cryptoModule.randomBytes(16).toString('hex');
      const hash = cryptoModule.scryptSync('Sapain123', salt, 64).toString('hex');
      await sql`
        INSERT INTO admin_users (username, password_hash, salt)
        VALUES ('admin', ${hash}, ${salt});
      `;
      console.log('[DB] Admin user created with password in database.');
    }

    // 5. Admin Sessions Table (Stores active authentication tokens)
    await sql`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id SERIAL PRIMARY KEY,
        token VARCHAR(128) NOT NULL UNIQUE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
}
