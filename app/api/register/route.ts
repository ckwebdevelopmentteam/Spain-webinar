import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, order_id, payment_id, signature, amount, ticket_id } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required' },
        { status: 400 }
      );
    }

    const sql = getDb();
    // Registrations initiated prior to checkout are stored as 'pending'
    const result = await sql`
      INSERT INTO registrations (name, email, phone, order_id, payment_id, signature, amount, ticket_id, status)
      VALUES (${name}, ${email}, ${phone}, ${order_id || null}, ${payment_id || null}, ${signature || null}, ${amount || 299}, ${ticket_id || null}, 'pending')
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: 'Registration created successfully. Awaiting payment verification.',
      registration: result[0],
      timestamp: result[0]?.created_at,
    });
  } catch (error: unknown) {
    console.error('Error saving registration to database:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Failed to save registration to database', success: false },
      { status: 500 }
    );
  }
}
