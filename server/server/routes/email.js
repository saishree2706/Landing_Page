// server.js or routes/sendEmail.js
import express from "express";
import { Resend } from "resend";
const router = express.Router();
const resend = new Resend(process.env.RESEND_API);
import User from "../models/User.js"; // ✅ Import your User model
import axios from "axios";
router.post("/", async (req, res) => {
    // ✅ root POST route
    const { from, to, subject, html, userNameEntered } = req.body;
    console.log("Request body:", from, to, subject, html, userNameEntered);
    try {
        // const emailResponse = "hi";
        const emailResponse = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "venkata.saishree@replicon.com",
          subject: "Test Email from Resend",
          html: "<b>HI SAI</b>",
        });
        // 2. Save to DB
        const userID = Date.now().toString(); // or use uuid
        const newUser = new User({ userName: userNameEntered, userEmail: to, userID: userID });
        await newUser.save();
        console.log("✅ Email sent successfully", emailResponse);
        res.status(200).json({ success: true, data: emailResponse });
    } catch (error) {
        console.error("❌ Failed to send email:", error?.message || error);
        res.status(500).json({ success: false, error: error?.message || "Internal Server Error" });
    }
});

export default router;
