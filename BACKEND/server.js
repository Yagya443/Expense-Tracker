const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
