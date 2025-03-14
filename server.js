const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000; // Use Render's PORT or fallback to 5000

// Middleware
app.use(cors()); // Allow frontend-backend communication
app.use(express.json()); // Parse JSON data in requests

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://bpanse2411:ITW3hkcvUdd1Dxdr@aqua-track.a4gty.mongodb.net/emailDB?retryWrites=true&w=majority&appName=aqua-track";
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// Define a schema for emails
const emailSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: String,
});

// Create a model
const Email = mongoose.model("Email", emailSchema);

// Route to save email history
app.post("/save-email", async (req, res) => {
    const { name, email, message } = req.body;
    const date = new Date().toLocaleString(); // Current date and time

    // Create a new email document
    const newEmail = new Email({ name, email, message, date });

    try {
        await newEmail.save(); // Save to MongoDB
        res.status(200).json({ message: "Email history saved successfully!" });
    } catch (err) {
        console.error("Error saving email:", err.message);
        res.status(500).json({ message: "Failed to save email history." });
    }
});

// Route to fetch email history
app.get("/get-history", async (req, res) => {
    try {
        const history = await Email.find().sort({ date: -1 }); // Fetch all emails, sorted by date
        res.status(200).json(history);
    } catch (err) {
        console.error("Error fetching email history:", err.message);
        res.status(500).json({ message: "Failed to fetch email history." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});