import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // you can use any service
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export default transporter;