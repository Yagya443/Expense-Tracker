import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";



function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<SignUp />}/>
            </Routes>
        </div>
    );
}

export default App;
