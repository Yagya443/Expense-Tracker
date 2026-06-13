import { useState } from "react";
import "./App.css";
import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/income"
                    element={
                        <ProtectedRoute>
                            <Income />
                         </ProtectedRoute> 
                    }
                />
                <Route
                    path="/expense"
                    element={
                        <ProtectedRoute>
                            <Expense />
                         </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
