// import { NextRequest, NextResponse } from 'next/server';

// // Simple email sending function - in production, use a proper email service
// async function sendEmail(data: {
//   name: string;
//   email: string;
//   phone?: string;
//   subject: string;
//   message: string;
// }) {
//   // For now, we'll just log the email data
//   // In production, integrate with a service like SendGrid, Resend, or Nodemailer
//   console.log('Contact form submission:', data);
  
//   // You can integrate with your existing email service here
//   // For example, call your Express server's email endpoint
//   try {
//     const response = await fetch(`${process.env.SERVER_URL || 'http://localhost:3000'}/api/contact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     return response.ok;
//   } catch (error) {
//     console.error('Error sending email via server:', error);
//     // Return true to simulate success if server is not available
//     // In production, handle this properly
//     return true;
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, email, phone, subject, message } = body;

//     // Validate required fields
//     if (!name || !email || !subject || !message) {
//       return NextResponse.json(
//         { status: 'ERROR', message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Create email
//     const mailOptions = {
//       from: name,
//       to: 'excerptech@gmail.com',
//       subject: 'Contact Form Submission',
//       html: `
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     };

//     // Send email
//     const emailSent = await sendEmail({ name, email, phone, subject, message });

//     if (emailSent) {
//       return NextResponse.json({ status: 'Message Sent' });
//     } else {
//       return NextResponse.json(
//         { status: 'ERROR', message: 'Failed to send email' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { status: 'ERROR', message: 'Failed to send message' },
//       { status: 500 }
//     );
//   }
// }




import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { status: 'ERROR', message: 'Missing fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kavanajs123456@gmail.com',
        pass: 'ptii kzwt rgkx hzio',
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'excerptech@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ status: 'Message Sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 'ERROR', message: 'Mail failed' },
      { status: 500 }
    );
  }
}
