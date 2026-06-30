const appName = "Voyage";

const COLORS = {
  pageBg: "#f8f5ef",          // warm cream page background
  cardBg: "#fffdf9",          // soft off-white card
  headerBg: "#f5efe4",        // cream header strip
  primaryBlue: "#163a70",     // dominant Voyage blue
  secondaryBlue: "#315d9b",   // lighter blue for secondary text
  bodyBlue: "#274c77",        // main paragraph text
  mutedBlue: "#5f7ea6",       // muted labels/footer
  border: "#e8dcc8",          // soft cream border
  successBg: "#eef5ff",       // blue-tinted success box
  successBorder: "#bfd6ff",
  rejectBg: "#f7faff",
  rejectBorder: "#c9dcff",
};

const baseTemplate = ({
  title,
  previewText,
  content,
}: {
  title: string;
  previewText: string;
  content: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>
    <body style="margin:0; padding:0; background-color:${COLORS.pageBg}; font-family:Arial, Helvetica, sans-serif;">
      <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
        ${previewText}
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.pageBg}; padding:28px 12px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:660px; background:${COLORS.cardBg}; border-radius:18px; overflow:hidden; border:1px solid ${COLORS.border}; box-shadow:0 8px 30px rgba(22,58,112,0.08);">
              
              <!-- Header -->
              <tr>
                <td style="background:${COLORS.headerBg}; padding:30px 34px 24px; border-bottom:1px solid ${COLORS.border};">
                  <h1 style="margin:0; color:${COLORS.primaryBlue}; font-size:36px; line-height:1; font-weight:800; letter-spacing:-0.6px;">
                    ${appName}
                  </h1>
                  <p style="margin:10px 0 0; color:${COLORS.secondaryBlue}; font-size:14px; font-weight:600;">
                    Travel. Explore. Share.
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:34px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 34px; background:#fbf7ef; border-top:1px solid ${COLORS.border};">
                  <p style="margin:0; color:${COLORS.mutedBlue}; font-size:13px; line-height:1.7;">
                    This is an automated email from <strong style="color:${COLORS.primaryBlue};">${appName}</strong>.
                    Please do not reply directly to this message.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin-top:16px; color:${COLORS.mutedBlue}; font-size:12px;">
              © ${new Date().getFullYear()} ${appName}
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

export const imageApprovedTemplate = ({
  userName,
  destinationName,
  imageUrl,
}: {
  userName: string;
  destinationName: string;
  imageUrl?: string;
}) => {
  const subject = `Your image for ${destinationName} was approved 🎉`;

  const text = [
    `Hi ${userName},`,
    ``,
    `Good news — your image submission for ${destinationName} has been approved by the Voyage team.`,
    `It may now appear in the destination gallery for other travelers to see.`,
    ``,
    `Thanks for contributing to Voyage.`,
  ].join("\n");

  const html = baseTemplate({
    title: "Image Approved",
    previewText: `Your image submission for ${destinationName} has been approved.`,
    content: `
      <p style="margin:0 0 14px; color:${COLORS.primaryBlue}; font-size:28px; font-weight:800; line-height:1.2;">
        Your image was approved 🎉
      </p>

      <p style="margin:0 0 18px; color:${COLORS.bodyBlue}; font-size:15px; line-height:1.9;">
        Hi <strong style="color:${COLORS.primaryBlue};">${userName}</strong>,
      </p>

      <p style="margin:0 0 18px; color:${COLORS.bodyBlue}; font-size:15px; line-height:1.9;">
        Good news — your image submission for
        <strong style="color:${COLORS.primaryBlue};">${destinationName}</strong> has been approved by the Voyage team.
      </p>

      <div style="margin:24px 0; padding:18px 20px; background:${COLORS.successBg}; border:1px solid ${COLORS.successBorder}; border-radius:12px;">
        <p style="margin:0; color:${COLORS.primaryBlue}; font-size:15px; line-height:1.8; font-weight:500;">
          Your image is now eligible to appear in the destination gallery and be viewed by other travelers on Voyage.
        </p>
      </div>

      ${
        imageUrl
          ? `
          <div style="margin:26px 0;">
            <p style="margin:0 0 10px; color:${COLORS.secondaryBlue}; font-size:14px; font-weight:700;">
              Submitted image
            </p>
            <img
              src="${imageUrl}"
              alt="Approved destination image"
              style="display:block; width:100%; max-width:100%; border-radius:14px; border:1px solid ${COLORS.border};"
            />
          </div>
        `
          : ""
      }

      <p style="margin:22px 0 0; color:${COLORS.bodyBlue}; font-size:15px; line-height:1.9;">
        Thanks for contributing to <strong style="color:${COLORS.primaryBlue};">Voyage</strong> and helping improve the travel gallery for the community.
      </p>
    `,
  });

  return { subject, text, html };
};

export const imageRejectedTemplate = ({
  userName,
  destinationName,
  rejectionReason,
}: {
  userName: string;
  destinationName: string;
  rejectionReason?: string;
}) => {
  const subject = `Update on your image submission for ${destinationName}`;

  const text = [
    `Hi ${userName},`,
    ``,
    `Thanks for submitting an image for ${destinationName}.`,
    `Unfortunately, it wasn’t approved for the Voyage gallery this time.`,
    rejectionReason ? `Reason: ${rejectionReason}` : "",
    ``,
    `You can upload another image that better matches our quality or content guidelines.`,
    `Thanks for contributing to Voyage.`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = baseTemplate({
    title: "Image Submission Update",
    previewText: `Your image submission for ${destinationName} was not approved this time.`,
    content: `
      <p style="margin:0 0 14px; color:${COLORS.primaryBlue}; font-size:28px; font-weight:800; line-height:1.2;">
        Image submission update
      </p>

      <p style="margin:0 0 18px; color:${COLORS.bodyBlue}; font-size:15px; line-height:1.9;">
        Hi <strong style="color:${COLORS.primaryBlue};">${userName}</strong>,
      </p>

      <p style="margin:0 0 16px; color:${COLORS.bodyBlue}; font-size:15px; line-height:1.9;">
        Thanks for submitting an image for
        <strong style="color:${COLORS.primaryBlue};">${destinationName}</strong>.
        After review, it wasn’t approved for the Voyage gallery this time.
      </p>

      <div style="margin:24px 0; padding:18px 20px; background:${COLORS.rejectBg}; border:1px solid ${COLORS.rejectBorder}; border-radius:12px;">
        <p style="margin:0 0 8px; color:${COLORS.primaryBlue}; font-size:15px; font-weight:700;">
          Submission status: Not approved
        </p>
        <p style="margin:0; color:${COLORS.bodyBlue}; font-size:14px; line-height:1.8;">
          This usually happens if the image doesn’t meet our gallery quality standards,
          doesn’t clearly represent the destination, or has formatting/content issues.
        </p>
      </div>

      ${
        rejectionReason
          ? `
          <div style="margin:20px 0; padding:18px 20px; background:#fffdf9; border:1px solid ${COLORS.border}; border-radius:12px;">
            <p style="margin:0 0 8px; color:${COLORS.primaryBlue}; font-size:14px; font-weight:700;">
              Review note
            </p>
            <p style="margin:0; color:${COLORS.bodyBlue}; font-size:14px; line-height:1.8;">
              ${rejectionReason}
            </p>
          </div>
        `
          : ""
      }

      <p style="margin:22px 0 0; color:${COLORS.bodyBlue}; font-size:15px; line-height:1.9;">
        You can upload another image with better clarity, composition, or destination relevance.
        We’d be happy to review it again.
      </p>
    `,
  });

  return { subject, text, html };
};