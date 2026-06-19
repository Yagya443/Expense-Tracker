import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/`, {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);          
            
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Please enter your details to login
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="abc@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
