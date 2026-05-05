import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { getStartOfDay } from "../utils";
import axios from "axios"


const IncomeModel = ({ closeModal }) => {
   const [amount, setAmount] = useState("");
    const [category, setCategory] = useState('Salary');
    const [date, setDate] = useState(getStartOfDay(Date.now()));

    const handleAddIncome = async () => {

        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:5000/income", {
                amount,
                category,
                date,
            },{
                headers:{
                    Authorization:`bearer ${token}`
                }
            });

            console.log("Added Successfully");
        } catch (error) {
            if (error.response?.status === 401) {
                console.error("Session expired ");
            }
        }
        closeModal()
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            {/* Modal Box */}
            <div className="bg-white w-96 p-5 rounded-xl shadow-lg relative">
                {/* Close Button */}
                <IoMdClose
                    className="absolute right-3 top-3 cursor-pointer"
                    size={25}
                    onClick={closeModal}
                />

                <h2 className="text-2xl font-semibold mb-4">Add Income</h2>

                {/* Title */}
              

                <input
                    type="number"
                    placeholder="Amount"
                    className="border w-full px-3 py-2 mb-3 rounded"
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    className="border w-full px-3 py-2 mb-3 rounded"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Salary">Salary</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="date"
                    className="border w-full px-3 py-2 mb-4 rounded"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />

                <button
                    className="bg-violet-500 text-white w-full py-2 rounded font-semibold"
                    onClick={handleAddIncome}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default IncomeModel;
