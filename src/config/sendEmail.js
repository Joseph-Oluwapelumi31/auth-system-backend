import dotenv from 'dotenv';
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "no-reply@resend.dev",  // free domain  
      to,
      subject,
      html,
    });
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.log("Resend error:", error);
    throw new Error("Email failed");
  }
};

export default sendEmail;