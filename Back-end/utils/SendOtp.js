const twilio = require("twilio");

const accountSid = "AC64b3e6c552ab6fe9dd58bf39a934becb";
const authToken = "c41660f74f7cae448e0793a5370eae44";
const twilioPhone = "010229840"; 

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
