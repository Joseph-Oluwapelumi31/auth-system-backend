import dotenv from "dotenv";
dotenv.config(); // load env before using it


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) console.log("Mailer verification failed:", error);
  else{ 
    console.log("Mailer is ready ✅");
  }
});

export default transporter;
