import nodemailer from "nodemailer";

const sendNodemailer = async ({ gmail, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: `BRICKZONE STROE <${process.env.EMAIL}>`,
    to: gmail,
    subject,
    html,
  });
};

export default sendNodemailer;
