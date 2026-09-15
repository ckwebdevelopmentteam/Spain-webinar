import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const isAuthorized = await verifyAdminRequest(request);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing admin credentials', success: false },
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
