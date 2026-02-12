const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendIncompleteMail = async (data) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER, // ✅ Admin only
    subject: `Incomplete Registration - ${data.registrationId || ''}`,
    text: `User did not complete registration.

Registration ID: ${data.registrationId || 'N/A'}
Role: ${data.role || 'N/A'}
Current Step: ${data.currentStep || 'N/A'}
Started: ${data.savedAt || 'N/A'}
Timeout: ${data.timeoutAt || 'N/A'}

User Details:
Name: ${data?.formData?.personalInfo?.name || 'Not provided'}
Mobile: ${data?.formData?.personalInfo?.mobileNo || 'Not provided'}
Email: ${data?.formData?.personalInfo?.email || 'Not provided'}

Complete Data:
${JSON.stringify(data, null, 2)}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Incomplete registration alert sent to admin`);
  } catch (error) {
    console.log("❌ Mail error:", error.message);
    throw error; // ✅ Add this so register.js knows email failed
  }
};

module.exports = sendIncompleteMail;