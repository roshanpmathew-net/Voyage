import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const testMail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Mail server connection successful");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Voyage" <${process.env.EMAIL_USER}>`,
      to: "roshanpmathew@netstratum.com",
      subject: "Voyage Nodemailer Test",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Voyage Test Email</h1>
          <p>If you received this email, Nodemailer is working correctly.</p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error testing Nodemailer:", error);
  }
};

testMail();