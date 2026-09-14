import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Sapain123';

export async function GET() {
  try {
    await initDb();
    const sql = getDb();
    const batches = await sql`SELECT * FROM batches ORDER BY id ASC;`;
    return NextResponse.json({ success: true, data: batches });
  } catch (error: unknown) {
    console.error('Error fetching batches:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const pass = request.headers.get('x-admin-password');
    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
    }

    await initDb();
    const body = await request.json().catch(() => ({}));
    const { name, fee, description } = body;

    if (!name || fee === undefined) {
      return NextResponse.json(
        { error: 'Batch name and fee amount are required', success: false },
        { status: 400 }
      );
    }

    const sql = getDb();
    const result = await sql`
      INSERT INTO batches (name, fee, description)
      VALUES (${name}, ${Number(fee)}, ${description || ''})
      ON CONFLICT (name) DO UPDATE SET fee = ${Number(fee)}, description = ${description || ''}
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: 'Batch fee updated successfully',
      batch: result[0],
    });
  } catch (error: unknown) {
    console.error('Error setting batch fee:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Failed to save batch settings', success: false },
      { status: 500 }
    );
  }
}
