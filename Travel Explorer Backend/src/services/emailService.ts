import transporter from "../config/mail.ts";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailOptions) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Voyage" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};