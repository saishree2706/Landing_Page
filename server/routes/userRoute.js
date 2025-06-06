import express from "express";
const router = express.Router();
import User from "../models/User.js";

// GET /user/count - Get total number of user records
router.get('/count', async (req, res) => {
  try {
    const count = await User.estimatedDocumentCount(); // or use countDocuments({})

    res.json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/:email", async (req, res) => {
    console.log(req.params);
    const userEmailId = req.params?.email;
    try {
        // const users = await User.find();
        const user = await User.findOne({ userEmail: userEmailId });
        if (!user) {
            console.error("❌ User not found for email:", userEmailId);
            return res.status(200).json({ success: false, message: "User not found" });
        }
        // res.json(user);
        console.log("✅ User fetched successfully:", user);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("❌ Failed to fetch users:", error?.message || error);
        res.status(500).json({ success: false, error: error?.message || "Internal Server Error" });
    }
});


export default router;