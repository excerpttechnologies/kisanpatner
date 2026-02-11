const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify transporter configuration (optional, but helpful for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ MAIL TRANSPORTER ERROR:", error);
  } else {
    console.log("✅ MAIL TRANSPORTER READY");
  }
});

const sendIncompleteMail = async (data) => {
  // Check if email credentials are configured
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log("❌ MAIL CREDENTIALS NOT CONFIGURED");
    return;
  }

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER, // Change this to the admin email or support email
    subject: "⚠️ Incomplete Registration Alert",
    text: `User did not complete registration within 8 minutes.\n\nRegistration Data:\n${JSON.stringify(
      data,
      null,
      2
    )}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.log("❌ Mail error:", error);
    throw error; // Throw error for better debugging
  }
};

module.exports = sendIncompleteMail;