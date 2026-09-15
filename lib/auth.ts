import crypto from 'crypto';
import { getDb, initDb } from '@/lib/db';

/**
 * Hashes a password using crypto.scryptSync with a cryptographic salt.
 */
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, generatedSalt, 64).toString('hex');
  return { hash, salt: generatedSalt };
}

/**
 * Verifies a password against a stored scrypt hash using constant-time comparison.
 */
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const computedHash = crypto.scryptSync(password, salt, 64).toString('hex');
    const bufA = Buffer.from(computedHash);
    const bufB = Buffer.from(storedHash);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Validates whether the incoming HTTP request is from an authenticated admin.
 * Checks:
 * 1. Bearer token or x-admin-token in admin_sessions table
 * 2. x-admin-password verified against the hashed password in admin_users table
 */
export async function verifyAdminRequest(request: Request): Promise<boolean> {
  try {
    await initDb();
    const sql = getDb();

    // Check for Bearer token or x-admin-token
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : request.headers.get('x-admin-token')?.trim();

    if (token) {
      const session = await sql`
        SELECT * FROM admin_sessions 
        WHERE token = ${token} 
          AND expires_at > CURRENT_TIMESTAMP 
        LIMIT 1;
      `;
      if (session && session.length > 0) {
        return true;
      }
    }

    // Check for x-admin-password header (verified against DB hash)
    const rawPass = request.headers.get('x-admin-password')?.trim();
    if (!rawPass) {
      return false;
    }

    // Fetch stored admin credentials from database
    const adminUser = await sql`
      SELECT * FROM admin_users 
      WHERE username = 'admin' 
      LIMIT 1;
    `;

    if (!adminUser || adminUser.length === 0) {
      return false;
    }

    const { password_hash, salt } = adminUser[0];
    return verifyPassword(rawPass, password_hash, salt);
  } catch (err) {
    console.error('[Auth] Error in verifyAdminRequest:', err);
    return false;
  }
}

/**
 * Creates an authenticated session in admin_sessions and returns the token.
 */
export async function createAdminSession(): Promise<string> {
  await initDb();
  const sql = getDb();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours validity

  await sql`
    INSERT INTO admin_sessions (token, expires_at)
    VALUES (${token}, ${expiresAt.toISOString()});
  `;

  return token;
}
