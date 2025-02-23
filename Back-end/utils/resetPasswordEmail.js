const nodeMailer = require("nodemailer");

const sendResetPasswordEmail = async ({ email, userName, otpCode }) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const logoURL =
    "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738880266/Logo_n4drwz.png";

  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; background-color: #ffffff; margin: 0; padding: 0;">
          <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
              <div style="text-align: center; margin-bottom: 20px;">
                  <img src="${logoURL}" alt="Company Logo" style="width: 150px;">
              </div>
              <div style="margin-bottom: 20px; font-size: 16px;">
                  <h2 style="color: #222;">Password Reset Request</h2>
                  <p>Dear <strong>${userName}</strong>,</p>
                  <p>Your password reset OTP is:</p>
                 
                    <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; 
                             padding: 30px 30px; 
                             color:rgb(212, 178, 87); 
                             font-size: 50px; 
                             font-weight: bold; 
                             border-radius: 8px;">
                    ${otpCode}
                </span>
            </div>

                  <p>This OTP is valid for 5 minutes. Please use it to reset your password.</p>
                  <p>If you did not request a password reset, please ignore this email.</p>
                  <p>Best regards,<br><strong>ElHayl Team</strong></p>
              </div>
              <div style="font-size: 12px; color: #777; text-align: center; margin-top: 20px;">
                  <p>&copy; ${new Date().getFullYear()} ElHayl. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (err) {
    console.error("❌ Email sending error:", err);
    throw new Error(`Failed to send email: ${err.message}`);
  }
};

module.exports = sendResetPasswordEmail;
