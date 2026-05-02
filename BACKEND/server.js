const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./srv/Models/user.model");
const Expense = require("./srv/Models/expense.model");
const jwt = require("jsonwebtoken");
const { default: Income } = require("./srv/Models/income.model");;

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
        console.log(error);

        console.error(error);
    }
});

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

app.post("/expense", authMiddleware, async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: "All fields required" });
        }

        const expense = new Expense({
            userId: req.user.id,
            title,
            amount,
            category,
        });

        await expense.save();

        res.status(201).json({
            message: "Expense added",
            expense,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/income",authMiddleware, async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: "All fields required" });
        }

        const income = new Income({
            userId: req.user.id,
            title,
            amount,
            category,
        });

        await income.save();

        res.status(201).json({
            message: "Income added",
            income,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
