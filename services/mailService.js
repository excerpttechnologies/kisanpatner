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
    to: process.env.MAIL_USER,
    subject: "Incomplete Registration Alert",
    text: `User did not complete registration.\n\nData:\n${JSON.stringify(
      data,
      null,
      2
    )}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully");
  } catch (error) {
    console.log("❌ Mail error:", error);
  }
};

module.exports = sendIncompleteMail;