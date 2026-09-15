import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { verifyPassword, createAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json().catch(() => ({}));
    const password = (body.password || '').trim();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required', success: false },
        { status: 400 }
      );
    }

    const sql = getDb();
    const adminUser = await sql`
      SELECT * FROM admin_users 
      WHERE username = 'admin' 
      LIMIT 1;
    `;

    if (!adminUser || adminUser.length === 0) {
      return NextResponse.json(
        { error: 'Admin user not configured in database', success: false },
        { status: 500 }
      );
    }

    const { password_hash, salt } = adminUser[0];
    const isValid = verifyPassword(password, password_hash, salt);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials', success: false },
        { status: 401 }
      );
    }

    // Create session in DB and return token
    const token = await createAdminSession();

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token,
    });

    // Set HttpOnly, Secure, SameSite session cookie
    response.cookies.set('sapain_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    console.error('Error during admin login:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
