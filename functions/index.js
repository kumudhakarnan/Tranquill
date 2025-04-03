const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// 🔥 Replace with your Gmail credentials
const EMAIL = "suriyakarnan13@gmail.com";
const PASSWORD = "Kums13@4"; // Use App Password, not your actual Gmail password

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Function to send daily emails
exports.sendDailyMotivation = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  try {
    const mailOptions = {
      from: `TRANQUIL!! <${EMAIL}>`,
      to: "kumudhakarnan3@gmail.com", // You need to fetch user emails dynamically from Firestore
      subject: "Your Daily Motivation 🌟",
      text: "Stay positive and keep pushing forward! 🚀",
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Daily motivational email sent!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }

  return null;
});
