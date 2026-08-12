import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Sapain123';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pass = request.headers.get('x-admin-password') || searchParams.get('password');

    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid admin password', success: false },
        { status: 401 }
      );
    }

    await initDb();
    const sql = getDb();
    const registrations = await sql`
      SELECT * FROM registrations ORDER BY created_at DESC;
    `;

    return NextResponse.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error: unknown) {
    console.error('Error fetching admin registrations:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
