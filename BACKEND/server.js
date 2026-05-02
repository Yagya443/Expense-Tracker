const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./srv/Models/user.model");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB Connected`);
};
connectDB();

app.use(express.json());

// Login

app.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res
                .status(400)
                .json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
    }
});

//signup
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

        res.status(201).json({
            message: "Account created successfully",
        });
    } catch (error) {
        console.error(error);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
