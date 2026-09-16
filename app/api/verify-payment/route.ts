import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb, initDb } from '@/lib/db';
import { sendPaymentConfirmationEmail } from '@/lib/mailer';
import { getWhatsAppGroup } from '@/lib/whatsapp';

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

    const userName = userDetails?.name || body.name || 'Verified Customer';
    const userEmail = userDetails?.email || body.email || 'customer@sapain.edu';
    const userPhone = userDetails?.phone || userDetails?.contact || body.phone || 'N/A';
    const userLanguage = userDetails?.language || body.language || 'English';
    const ticketPassId = ticket_id || `SA-${Math.floor(100000 + Math.random() * 900000)}`;

    // Always attempt to save or update registration in Neon Database
    try {
      await initDb();
      const sql = getDb();

      // Check if a registration exists for this email/phone or order_id
      const existing = await sql`
        SELECT * FROM registrations 
        WHERE (email = ${userEmail} AND email != 'customer@sapain.edu') 
           OR (phone = ${userPhone} AND phone != 'N/A') 
           OR order_id = ${razorpay_order_id}
        LIMIT 1;
      `;

      if (existing && existing.length > 0) {
        // Update existing row to completed with payment details
        await sql`
          UPDATE registrations
          SET status = 'completed',
              order_id = ${razorpay_order_id},
              payment_id = ${razorpay_payment_id},
              signature = ${razorpay_signature},
              amount = ${amount || 499},
              ticket_id = COALESCE(ticket_id, ${ticketPassId})
          WHERE id = ${existing[0].id};
        `;
      } else {
        // Insert new completed registration record
        await sql`
          INSERT INTO registrations (name, email, phone, order_id, payment_id, signature, amount, ticket_id, status)
          VALUES (
            ${userName},
            ${userEmail},
            ${userPhone},
            ${razorpay_order_id},
            ${razorpay_payment_id},
            ${razorpay_signature},
            ${amount || 499},
            ${ticketPassId},
            'completed'
          );
        `;
      }
    } catch (dbErr) {
      console.error('Error saving verified registration to Neon DB:', dbErr);
    }

    // Send branded payment confirmation email with WhatsApp group link & Sapain logo
    try {
      if (userEmail && userEmail !== 'customer@sapain.edu') {
        await sendPaymentConfirmationEmail({
          toEmail: userEmail,
          userName,
          ticketId: ticketPassId,
          paymentId: razorpay_payment_id,
          amount: amount || 499,
          language: userLanguage,
        });
      }
    } catch (emailErr) {
      console.error('Error sending confirmation email:', emailErr);
    }

    const whatsappInfo = getWhatsAppGroup(userLanguage);

    return NextResponse.json({
      message: 'Payment verified successfully',
      success: true,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      ticket_id: ticketPassId,
      whatsappGroup: {
        title: whatsappInfo.title,
        buttonText: whatsappInfo.buttonText,
        url: whatsappInfo.url,
      },
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
