import React from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
    return (
        <div className="border">
            <div>
                <h2>Welcome Back</h2>
                <h4>Please Enter Your Details for Login</h4>
            </div>

            <div>
                <div>
                    <label>Email Address</label>
                    <input placeholder="abc@example.com" />
                </div>
                <div>
                    <label>Email Address</label>
                    <input placeholder="abc@example.com" />
                </div>
                <button>Login</button>
                <p>
                    Don't Have Account <Link to={<SignUp />}>SignUp</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
