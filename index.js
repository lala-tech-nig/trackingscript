const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "olaniyanshamsudeenyinka001@gmail.com", // Replace with your Gmail
    pass: "hhcf murv vxae angt" // Replace with your Gmail app password (not your actual password)
  }
});

app.post("/collect", (req, res) => {
  const deviceInfo = req.body;

  // Compose the email
  const mailOptions = {
    from: "olaniyanshamsudeenyinka001@gmail.com",
    to: "lalatechnigltd@gmail.com", // Replace with your Gmail
    subject: "Device Info Collected",
    text: `Device Information:
    IP Address: ${deviceInfo.ip}
    User Agent: ${deviceInfo.userAgent}
    Platform: ${deviceInfo.platform}
    Language: ${deviceInfo.language}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Device info received and emailed successfully.");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
