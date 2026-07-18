import axios from "axios";
import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(false);
    

    const navigate = useNavigate();   

    const handleSignUp = async () => {

        setLoading(true);


        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup`,
                {
                    name,
                    email,
                    password,
                },
            );

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-8  rounded-2xl shadow-lg w-full max-w-lg">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Hello</h2>
                    <p className="text-gray-500 text-sm">
                        Please enter your details to cretae account
                    </p>
                </div>


                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="abc@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
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
                        onClick={handleSignUp}
                    >
                         {loading ? (
                            <p className="opacity-25">Loading</p>
                        ) : (
                            <p>Sign Up</p>
                        )}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
