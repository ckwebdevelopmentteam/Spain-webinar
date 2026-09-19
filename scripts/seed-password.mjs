import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('No DATABASE_URL found');
  process.exit(1);
}

const sql = neon(dbUrl);

async function main() {
  console.log('Connecting to database...');
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

  const existingAdmin = await sql`SELECT id, username FROM admin_users WHERE username = 'admin' LIMIT 1;`;
  console.log('Existing admin query result:', existingAdmin);

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync('Sapain123', salt, 64).toString('hex');

  if (!existingAdmin || existingAdmin.length === 0) {
    await sql`
      INSERT INTO admin_users (username, password_hash, salt)
      VALUES ('admin', ${hash}, ${salt});
    `;
    console.log('Inserted admin user with password Sapain123.');
  } else {
    await sql`
      UPDATE admin_users 
      SET password_hash = ${hash}, salt = ${salt}, updated_at = CURRENT_TIMESTAMP
      WHERE username = 'admin';
    `;
    console.log('Updated existing admin user password to Sapain123.');
  }

  // Verify
  const check = await sql`SELECT id, username, password_hash, salt FROM admin_users WHERE username = 'admin';`;
  const computedHash = crypto.scryptSync('Sapain123', check[0].salt, 64).toString('hex');
  const isValid = computedHash === check[0].password_hash;
  console.log('Verification check for password Sapain123:', isValid ? 'SUCCESS' : 'FAILED');
}

main().catch(err => {
  console.error('Error in seed script:', err);
  process.exit(1);
});
