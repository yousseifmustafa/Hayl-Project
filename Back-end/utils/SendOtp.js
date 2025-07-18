const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE; 

const client = new twilio(accountSid, authToken);

    
const sendOTP = async (phone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}. It will expire in 1 minute.`,
      from: twilioPhone,
      to: phone,
    });
    console.log("OTP sent:", message.sid);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

module.exports = sendOTP;
