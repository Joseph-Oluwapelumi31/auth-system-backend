import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

  
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  greetingTimeout: 10000 // 10s to avoid "Greeting never received"
});

transporter.verify((error, success) => {
  if (error) console.log("Mailer verification failed:", error);
  else console.log("Mailer is ready ✅");
});

export default transporter;
