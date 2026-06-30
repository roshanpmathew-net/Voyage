import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // false for 587, true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const verifyMailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Mail server is ready");
  } catch (error) {
    console.error("Mail server connection failed:", error);
  }
};

export default transporter;