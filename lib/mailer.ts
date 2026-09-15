import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export interface SendPaymentConfirmationEmailParams {
  toEmail: string;
  userName: string;
  ticketId: string;
  paymentId: string;
  amount: number | string;
  language?: string;
}

const WHATSAPP_GROUPS: Record<string, { title: string; url: string }> = {
  malayalam: {
    title: 'Malayalam Batch WhatsApp Group',
    url: 'https://chat.whatsapp.com/B5yW3uGjrDLAFHWurd6ZBn?s=cl&p=a&mlu=0&ilr=4',
  },
  hindi: {
    title: 'Hindi Batch WhatsApp Group',
    url: 'https://chat.whatsapp.com/DBG3P9q7gVh6g7yG9j9StF?s=cl&p=a&mlu=0&ilr=4',
  },
  english: {
    title: 'English Batch WhatsApp Group',
    url: 'https://chat.whatsapp.com/FidgNJ08MAX1Jh5Y4Nubw2?s=cl&p=a&mlu=0&ilr=4',
  },
};

/**
 * Creates and returns a Nodemailer transporter based on environment variables.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== undefined 
    ? process.env.SMTP_SECURE === 'true' 
    : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a branded payment confirmation email containing:
 * - Sapain logo
 * - Registration confirmation and ticket/payment IDs
 * - Language-specific WhatsApp community group link
 */
export async function sendPaymentConfirmationEmail({
  toEmail,
  userName,
  ticketId,
  paymentId,
  amount,
  language = 'English',
}: SendPaymentConfirmationEmailParams) {
  try {
    const transporter = getTransporter();

    const normalizedLang = (language || 'english').toLowerCase().trim();
    const groupInfo = WHATSAPP_GROUPS[normalizedLang] || WHATSAPP_GROUPS['english'];
    const formattedLang = language.charAt(0).toUpperCase() + language.slice(1);

    if (!transporter) {
      console.warn(
        '[Mailer] SMTP credentials not configured (SMTP_USER / SMTP_PASS). Email sending skipped for:',
        toEmail
      );
      return { success: false, skipped: true, error: 'SMTP credentials not configured in environment' };
    }

    // Check if logo exists locally to attach inline
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const hasLogo = fs.existsSync(logoPath);

    const attachments = hasLogo
      ? [
          {
            filename: 'logo.png',
            path: logoPath,
            cid: 'sapain-logo',
          },
        ]
      : [];

    const logoSrc = hasLogo
      ? 'cid:sapain-logo'
      : 'https://sapain.in/logo.png';

    const fromAddress = process.env.SMTP_FROM || `"Sapain Edu" <${process.env.SMTP_USER}>`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sapain Masterclass Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0c0d0e; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #141517; border: 1px solid #26272b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header with Sapain Logo -->
          <tr>
            <td align="center" style="padding: 36px 24px 24px 24px; background: linear-gradient(180deg, #1a1b1e 0%, #141517 100%); border-bottom: 1px solid #26272b;">
              <img src="${logoSrc}" alt="Sapain Edu" width="160" style="display: block; max-width: 160px; height: auto; margin: 0 auto 16px auto;" />
              <div style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.35); color: #4ade80; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">
                ✓ Payment &amp; Enrollment Confirmed
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <h1 style="margin: 0 0 12px 0; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">
                Welcome to Sapain, ${userName}! 🎨
              </h1>
              <p style="margin: 0 0 24px 0; color: #9ca3af; font-size: 15px; line-height: 1.6;">
                Thank you for enrolling in the <strong style="color: #ffffff;">Advanced AI Image &amp; Cinematic Video Masterclass</strong>. Your seat is officially reserved.
              </p>

              <!-- Ticket & Payment Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1a1b1f; border: 1px solid #2d2f36; border-radius: 12px; margin-bottom: 28px; overflow: hidden;">
                <tr>
                  <td style="padding: 18px 20px; border-bottom: 1px solid #2d2f36;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Ticket ID</td>
                        <td align="right" style="color: #ffffff; font-size: 15px; font-weight: 700; font-family: monospace;">${ticketId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #2d2f36;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #9ca3af; font-size: 13px;">Selected Batch</td>
                        <td align="right" style="color: #e5e7eb; font-size: 14px; font-weight: 600;">${formattedLang} Batch</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #2d2f36;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #9ca3af; font-size: 13px;">Amount Paid</td>
                        <td align="right" style="color: #4ade80; font-size: 15px; font-weight: 700;">₹${amount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #9ca3af; font-size: 13px;">Payment Reference</td>
                        <td align="right" style="color: #9ca3af; font-size: 12px; font-family: monospace;">${paymentId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- WhatsApp Community Box (CRITICAL) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 24px 20px; margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <div style="font-size: 24px; margin-bottom: 8px;">📲</div>
                    <h2 style="margin: 0 0 8px 0; color: #ffffff; font-size: 18px; font-weight: 700;">
                      ${groupInfo.title}
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #d1d5db; font-size: 14px; line-height: 1.5; max-width: 460px;">
                      Please join your dedicated batch group immediately. All live session links, workflow materials, and recordings will be shared exclusively in this group.
                    </p>
                    <a href="${groupInfo.url}" target="_blank" style="display: inline-block; background-color: #22c55e; color: #000000; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 6px 20px rgba(34, 197, 94, 0.35);">
                      Join WhatsApp Group Now →
                    </a>
                    <div style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                      Can't click the button? Copy &amp; open this link in your browser:<br />
                      <a href="${groupInfo.url}" style="color: #4ade80; text-decoration: underline; word-break: break-all;">${groupInfo.url}</a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Tips / Requirements -->
              <div style="background-color: #17181c; border-left: 3px solid #6366f1; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                  💡 <strong style="color: #e5e7eb;">Preparation Tip:</strong> Have a desktop/laptop or phone ready with an active internet connection. No prior coding or design skills are required.
                </p>
              </div>

              <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                We look forward to having you with us!<br /><br />
                Warm regards,<br />
                <strong style="color: #ffffff;">Team Sapain Edu</strong><br />
                <a href="https://sapain.in" style="color: #60a5fa; text-decoration: none; font-size: 13px;">sapain.in</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 24px; background-color: #0f1012; border-top: 1px solid #26272b; color: #6b7280; font-size: 12px; line-height: 1.5;">
              This is an automated confirmation of your registration with Sapain Edu.<br />
              If you have any questions, reach out to us at <a href="mailto:support@sapain.in" style="color: #9ca3af; text-decoration: underline;">support@sapain.in</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: fromAddress,
      to: toEmail,
      subject: `Registration Confirmed! Advanced AI Masterclass (${formattedLang} Batch) - Sapain Edu`,
      html: htmlContent,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Mailer] Payment confirmation email sent successfully to:', toEmail, 'MessageId:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Mailer] Failed to send payment confirmation email to', toEmail, error);
    return { success: false, error: (error as Error).message };
  }
}
