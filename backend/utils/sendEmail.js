// import nodemailer from "nodemailer";

// const sendEmail = async (to, subject, html) => {
//   try {
//     // Create the transporter using Gmail + App Password
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // your Gmail address
//         pass: process.env.EMAIL_PASS, // your 16-digit Gmail App Password
//       },
//     });

//     // Verify the connection before sending
//     await transporter.verify();
//     console.log("✅ Mail server connected successfully");

//     // Send the email
//     const info = await transporter.sendMail({
//       from: `"Uphar 🎁" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log(`✅ Email sent: ${info.messageId}`);
//     return true;
//   } catch (error) {
//     console.error("❌ Email sending failed:", error.message);
//     return false;
//   }
// };

// export default sendEmail;

import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Uphar 🎁" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};

export default sendEmail;
