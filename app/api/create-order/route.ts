import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay API credentials not configured in .env' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { amount, receipt } = body;
    const currency = body.currency || 'INR';

    // Validate amount (must be >= 100 paise)
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 paise' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(parsedAmount),
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      key_id: keyId,
    });
  } catch (error: unknown) {
    console.error('Error creating Razorpay order:', error);

    const errObj = error as {
      statusCode?: number;
      code?: string;
      error?: { code?: string; description?: string };
      message?: string;
    };

    if (
      errObj.statusCode === 401 ||
      (errObj.code === 'BAD_REQUEST_ERROR' && errObj.error?.code === 'AUTHENTICATION_ERROR') ||
      errObj.error?.description === 'Authentication failed'
    ) {
      return NextResponse.json(
        {
          error:
            'Razorpay Authentication Failed (401). The provided RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET in .env is invalid, expired, or deactivated by Razorpay.',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: errObj.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
