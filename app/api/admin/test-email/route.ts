import { NextResponse } from 'next/server';
import { sendPaymentConfirmationEmail } from '@/lib/mailer';
import { verifyAdminRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminRequest(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required to trigger test emails', success: false },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const testEmail = body.email || process.env.SMTP_USER;
    const testLanguage = body.language || 'English';

    if (!testEmail) {
      return NextResponse.json(
        { error: 'Recipient email is required (provide in JSON body as { "email": "your-email@example.com" })' },
        { status: 400 }
      );
    }

    const result = await sendPaymentConfirmationEmail({
      toEmail: testEmail,
      userName: body.name || 'Test Student',
      ticketId: 'SA-TEST-999',
      paymentId: 'pay_test_SAMPLE12345',
      amount: 499,
      language: testLanguage,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send test email',
          skipped: result.skipped,
          smtpConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email successfully dispatched to ${testEmail}!`,
      messageId: result.messageId,
      batchLanguage: testLanguage,
    });
  } catch (error: unknown) {
    console.error('Test email route error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal error' },
      { status: 500 }
    );
  }
}
