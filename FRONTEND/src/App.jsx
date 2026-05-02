import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";



function App() {
    return (
        <div className="">
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/income' element={<Income />}/>
                <Route path='/expense' element={<Expense />}/>
            </Routes>
        </div>
    );
}

export default App;
