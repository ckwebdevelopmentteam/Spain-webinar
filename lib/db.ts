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
  } catch (error) {
    console.error('Error initializing database table:', error);
  }
}
