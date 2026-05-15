const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./srv/Models/user.model");
const Expense = require("./srv/Models/expense.model");
const Income = require("./srv/Models/income.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

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

        if (!user || user.password !== password)
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
        return res.status(200).json({ message: error.message });
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
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
};

app.get("/user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Add expense
app.post("/expense", authMiddleware, async (req, res) => {
    try {
        const { amount, category, date } = req.body;

        if (!amount || !category) {
            return res.status(400).json({ message: "All fields required" });
        }

        const expense = new Expense({
            userId: req.user.id,

            amount,
            category,
            date: date || Date.now(),
        });

        await expense.save();

        res.status(201).json({
            message: "Expense added",
            expense,
        });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// view expense
app.get("/expense", authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.find({ userId: req.user.id });

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/recent-transaction", authMiddleware, async (req, res) => {
    try {
        const income = await Income.find({ userId: req.user.id });
        const expense = await Expense.find({ userId: req.user.id });

        recentTransaction = [...income, ...expense];

        res.status(200).json(recentTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Add Income
app.post("/income", authMiddleware, async (req, res) => {
    try {
        const { amount, category, date } = req.body;

        if (!amount || !category) {
            return res.status(400).json({ message: "All fields required" });
        }

        const income = new Income({
            userId: req.user.id,

            amount,
            category,
            date: date || Date.now(),
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

// view Income
app.get("/income", authMiddleware, async (req, res) => {
    try {
        const income = await Income.find({ userId: req.user.id });

        res.status(200).json(income);
    } catch (error) {
        console.error(error);
    }
});

app.get("/totalIncome", authMiddleware, async (req, res) => {
    try {
        const income = await Income.find({ userId: req.user.id });

        const total = income.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0);

        return res.status(200).json({
            total,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.get("/totalExpense", authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.find({ userId: req.user.id });

        const total = expense.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0);

        return res.status(200).json({
            total,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
