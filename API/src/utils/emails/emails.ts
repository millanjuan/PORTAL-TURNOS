import sgMail from "@sendgrid/mail";
import ejs from "ejs";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

let SENDGRID_API: string;
if (process.env.SENDGRID) {
  SENDGRID_API = process.env.SENDGRID;
}

export const sendVerificationEmail = async (
  email: string,
  securityCode: string
) => {
  try {
    const templatePath = "./src/utils/emails/templates/restore.ejs";
    const template = fs.readFileSync(templatePath, "utf-8");

    const renderedTemplate = ejs.render(template, { securityCode });
    sgMail.setApiKey(SENDGRID_API);

    const msg = {
      to: email,
      from: "segundojuan159951@gmail.com",
      subject: "Security code",
      html: renderedTemplate,
    };

    await sgMail.send(msg);
  } catch (error) {
    throw error;
  }
};
