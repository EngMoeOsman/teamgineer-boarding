import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template component
const ContactEmailTemplate = ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
    </div>

    <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #374151; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>

        <div style="margin: 15px 0;">
          <strong style="color: #6b7280; display: inline-block; width: 80px;">Name:</strong>
          <span style="color: #111827;">${name}</span>
        </div>

        <div style="margin: 15px 0;">
          <strong style="color: #6b7280; display: inline-block; width: 80px;">Email:</strong>
          <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
        </div>

        <div style="margin: 15px 0;">
          <strong style="color: #6b7280; display: inline-block; width: 80px;">Subject:</strong>
          <span style="color: #111827;">${subject}</span>
        </div>
      </div>

      <div style="background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #374151; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
        <p style="color: #374151; white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          <strong>💡 Quick Reply:</strong> Click the email address above to respond directly to ${name}.
        </p>
      </div>
    </div>

    <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
      <p>This email was sent from your website's contact form.</p>
      <p style="margin-top: 5px;">Received on ${new Date().toLocaleString(
        'en-US',
        { dateStyle: 'long', timeStyle: 'short' }
      )}</p>
    </div>
  </body>
</html>
`;

// Rate limiting (optional but recommended)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 submissions per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (subject.length < 3 || subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be between 3 and 200 characters' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str: string) => str.replace(/[<>]/g, '').trim();

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Contact Form <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'your-email@example.com',
      replyTo: email,
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: ContactEmailTemplate(sanitizedData),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Optional: Log to database or analytics
    console.log('Contact form submission:', {
      id: data?.id,
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
