// import { NextRequest, NextResponse } from 'next/server';
// import { writeFile, mkdir } from 'fs/promises';
// import { join } from 'path';

// // Simple email sending function - in production, use a proper email service
// async function sendApplicationEmail(data: {
//   job: string;
//   name: string;
//   email: string;
//   resumeName: string;
//   resumeBuffer: Buffer;
// }) {
//   // For now, we'll just log the application data
//   // In production, integrate with a service like SendGrid, Resend, or Nodemailer
//   console.log('Job application submission:', { ...data, resumeBuffer: '[Buffer]' });
  
//   // You can integrate with your existing email service here
//   // For example, call your Express server's email endpoint
//   try {
//     const formData = new FormData();
//     formData.append('job', data.job);
//     formData.append('name', data.name);
//     formData.append('email', data.email);
//     formData.append('resume', new Blob([new Uint8Array(data.resumeBuffer)]), data.resumeName);

//     const response = await fetch(`${process.env.SERVER_URL || 'http://localhost:3001'}/api/submit`, {
//       method: 'POST',
//       body: formData,
//     });
//     return response.ok;
//   } catch (error) {
//     console.error('Error sending application via server:', error);
//     // Return true to simulate success if server is not available
//     // In production, handle this properly
//     return true;
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const job = formData.get('job') as string;
//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;
//     const resume = formData.get('resume') as File;

//     if (!job || !name || !email || !resume) {
//       return NextResponse.json(
//         { status: 'ERROR', message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Validate file type
//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     ];
//     if (!allowedTypes.includes(resume.type)) {
//       return NextResponse.json(
//         { status: 'ERROR', message: 'Invalid file type' },
//         { status: 400 }
//       );
//     }

//     // Validate file size (5MB max)
//     const maxSize = 5 * 1024 * 1024;
//     if (resume.size > maxSize) {
//       return NextResponse.json(
//         { status: 'ERROR', message: 'File size exceeds 5MB limit' },
//         { status: 400 }
//       );
//     }

//     // Save file to uploads directory
//     const bytes = await resume.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const fileName = `${Date.now()}-${resume.name}`;
//     const uploadsDir = join(process.cwd(), 'public', 'uploads', 'resumes');
    
//     // Create directory if it doesn't exist (in production, use proper file storage)
//     try {
//       await mkdir(uploadsDir, { recursive: true });
//       const filePath = join(uploadsDir, fileName);
//       await writeFile(filePath, buffer);
//     } catch (error) {
//       console.error('Error saving file:', error);
//       // Continue even if file save fails - we'll still send the email
//     }

//     // Send email with application details
//     const emailSent = await sendApplicationEmail({
//       job,
//       name,
//       email,
//       resumeName: resume.name,
//       resumeBuffer: buffer,
//     });

//     return NextResponse.json({ status: 'SUCCESS', message: 'Application submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting application:', error);
//     return NextResponse.json(
//       { status: 'ERROR', message: 'Failed to submit application' },
//       { status: 500 }
//     );
//   }
// } 


// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import { writeFile, mkdir } from 'fs/promises';
// import { join } from 'path';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();

//     const job = formData.get('job') as string;
//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;
//     const resume = formData.get('resume') as File;

//     if (!job || !name || !email || !resume) {
//       return NextResponse.json({ status: 'ERROR', message: 'Missing fields' }, { status: 400 });
//     }

//     const bytes = await resume.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Optional: save file locally
//     const uploadsDir = join(process.cwd(), 'public/uploads/resumes');
//     await mkdir(uploadsDir, { recursive: true });
//     await writeFile(join(uploadsDir, `${Date.now()}-${resume.name}`), buffer);

//     // ✅ MAILER
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'kavanajs123456@gmail.com',
//         pass: 'ptii kzwt rgkx hzio',
//       },
//     });

//     await transporter.sendMail({
//       from: `"${name}" <${process.env.EMAIL_USER}>`,
//       to: 'kavanajs123456@gmail.com',
//       subject: `Job Application: ${job}`,
//       html: `
//         <p><strong>Job:</strong> ${job}</p>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//       `,
//       attachments: [
//         {
//           filename: resume.name,
//           content: buffer,
//         },
//       ],
//     });

//     return NextResponse.json({
//       status: 'SUCCESS',
//       message: 'Application submitted successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { status: 'ERROR', message: 'Submission failed' },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import mongoose from 'mongoose';

// Define the Resume schema
const resumeSchema = new mongoose.Schema(
  {
    job: String,
    name: String,
    email: String,
    resumePath: String,
  },
  { timestamps: true }
);

// Use existing model if it exists, otherwise create new one
const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);

// MongoDB connection function
async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const job = formData.get('job') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const resume = formData.get('resume') as File;

    if (!job || !name || !email || !resume) {
      return NextResponse.json({ status: 'ERROR', message: 'Missing fields' }, { status: 400 });
    }

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file locally
    const uploadsDir = join(process.cwd(), 'public/uploads/resumes');
    await mkdir(uploadsDir, { recursive: true });
    const filename = `${Date.now()}-${resume.name}`;
    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    // ✅ SAVE TO MONGODB
    await connectDB();
    await Resume.create({
      job,
      name,
      email,
      resumePath: `/uploads/resumes/${filename}`,
    });

    // ✅ SEND EMAIL
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kavanajs123456@gmail.com',
        pass: 'ptii kzwt rgkx hzio',
      },
    });

    await transporter.sendMail({
      from: `"${name}" <kavanajs123456@gmail.com>`,
      to: 'excerptech@gmail.com',
      subject: `Job Application: ${job}`,
      html: `
        <p><strong>Job:</strong> ${job}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    });

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 'ERROR', message: 'Submission failed' },
      { status: 500 }
    );
  }
}


