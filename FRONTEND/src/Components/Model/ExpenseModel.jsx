import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { getStartOfDay } from "../utils";
import axios from "axios";

const ExpenseModel = ({ closeModal,refreshExpenses }) => {
    const [emoji, setEmoji] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState(getStartOfDay(Date.now()));

    const handleAddExpense = async () => {
        const finalAmount = -Math.abs(Number(amount));

        const token = localStorage.getItem("token");

        if(emoji.length>1){
            return 
        }

        try {
            await axios.post(
                "http://localhost:5000/expense",
                {
                    emoji,
                    amount: finalAmount,
                    category,
                    date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            await refreshExpenses();
            closeModal();

            console.log("Added Successfully");
        } catch (error) {
            if (error.response?.status === 401) {
                console.error("Session expired ");
            }
        }
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

                <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>

                {/* emoji */}
                <input
                    type="text"
                    placeholder="Select Emoji (WindowsKey+.)"
                    className="border w-full px-3 py-2 mb-3 rounded"
                    onChange={(e) => setEmoji(e.target.value)}
                />

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
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
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
                    onClick={handleAddExpense}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default ExpenseModel;
