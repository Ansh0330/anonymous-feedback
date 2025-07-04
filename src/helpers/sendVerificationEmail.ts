import nodemailer from "nodemailer";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER || "maddison53@ethereal.email",
        pass: process.env.MAIL_PASS || "jn7jnAPss4f63QBp6D",
      },
    });

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        color: #333333;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }

      .header {
        background-color: #f8fafc;
        padding: 24px;
        text-align: center;
        border-bottom: 1px solid #eaeaea;
      }

      .header h1 {
        margin: 0;
        font-size: 22px;
        color: #222222;
      }

      .content {
        padding: 32px;
      }

      .content h2 {
        margin-top: 0;
        font-size: 18px;
        color: #333333;
      }

      .content p {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      .otp-box {
        display: inline-block;
        padding: 12px 24px;
        background-color: #f1f1f1;
        border-radius: 6px;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 3px;
        color: #222222;
        margin: 24px 0;
      }

      .footer {
        background-color: #f8fafc;
        text-align: center;
        padding: 16px;
        font-size: 13px;
        color: #888888;
        border-top: 1px solid #eaeaea;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>True Feedback</h1>
      </div>
      <div class="content">
        <h2>Hello ${username},</h2>
        <p>
          Thanks for signing up. To verify your email, please use the one-time password (OTP) below:
        </p>
        <div class="otp-box">${verifyCode}</div>
        <p>
          This OTP is valid for a limited time. If you did not sign up for True Feedback, you can safely ignore this email.
        </p>
        <p>Regards,<br />Team True Feedback</p>
      </div>
      <div class="footer">
        &copy; 2025 True Feedback. All rights reserved.
      </div>
    </div>
  </body>
</html>

`

    const options = {
      from: "True Feedback || By Ansh.dev",
      to: `${email}`,
      subject: "Verify Your Email Address",
      html: htmlBody,
      text: `Hello ${username},\n\nWe're thrilled to have you join us! To verify your email and activate your account, please use the OTP below:\n\n${verifyCode}\n\nIf you didn’t request this, you can safely ignore this email.\n\nThanks,\nTeam True Feedback`
    };
    // Send the email
    const emailResponse = await transporter.sendMail(options);
    console.log("Email sent successfully", emailResponse);
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification emails", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
