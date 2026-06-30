import { sendEmail } from "./emailService.ts";
import {
  imageApprovedTemplate,
  imageRejectedTemplate,
} from "../templates/emailTemplate.ts";

export const sendImageApprovedEmail = async ({
  to,
  userName,
  destinationName,
  imageUrl,
}: {
  to: string;
  userName: string;
  destinationName: string;
  imageUrl?: string;
}) => {
  const { subject, text, html } = imageApprovedTemplate({
    userName,
    destinationName,
    imageUrl,
  });

  return sendEmail({
    to,
    subject,
    text,
    html,
  });
};

export const sendImageRejectedEmail = async ({
  to,
  userName,
  destinationName,
}: {
  to: string;
  userName: string;
  destinationName: string;
  rejectionReason?: string;
}) => {
  const { subject, text, html } = imageRejectedTemplate({
    userName,
    destinationName,
  });

  return sendEmail({
    to,
    subject,
    text,
    html,
  });
};