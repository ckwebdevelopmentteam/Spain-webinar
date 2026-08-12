import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb, initDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userDetails, ticket_id, amount } = body;

    // Validate missing fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification fields', success: false },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay Key Secret is not configured', success: false },
        { status: 500 }
      );
    }

    // Generate expected signature using HMAC-SHA256
    const generated_signature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Compare generated signature with razorpay_signature
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature', success: false },
        { status: 400 }
      );
    }

    // Save registration to Neon Database if userDetails is provided
    if (userDetails && userDetails.name && userDetails.email && userDetails.phone) {
      try {
        await initDb();
        const sql = getDb();
        await sql`
          INSERT INTO registrations (name, email, phone, order_id, payment_id, signature, amount, ticket_id, status)
          VALUES (
            ${userDetails.name},
            ${userDetails.email},
            ${userDetails.phone},
            ${razorpay_order_id},
            ${razorpay_payment_id},
            ${razorpay_signature},
            ${amount || 499},
            ${ticket_id || null},
            'completed'
          );
        `;
      } catch (dbErr) {
        console.error('Error saving verified registration to Neon DB:', dbErr);
      }
    }

    return NextResponse.json({
      message: 'Payment verified successfully',
      success: true,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    });
  } catch (error: unknown) {
    console.error('Error verifying Razorpay payment:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
