import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getExpenseEmoji } from "../utils";

const DashboardExpense = () => {
    const [expense, setExpense] = useState([]);

    const navigate = useNavigate();

    const categories = ["Food", "Travel", "Bills", "Shopping", "Other"];

    const categoryTotals = categories.map((cat) => {
        const total = expense
            .filter((item) => item.category === cat)
            .reduce((sum, item) => sum + item.amount, 0);

        return {
            category: cat,
            total,
        };
    });

    const fetchExpense = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/expense`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setExpense(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchExpense();
    }, [fetchExpense]);

    return (
        <div>
            <h2 className="text-xl font-semibold">Expenses</h2>
            <button className="absolute rounded py-1 bg-gray-100 font-semibold px-3 right-4 top-4 flex items-center gap-2"
                onClick={()=>navigate('/expense')}
                
            >
                See All <FaArrowRight />
            </button>
            <div className="grid gap-2 mt-4">
                {categoryTotals.map((item) => (
                    <div
                        key={item.category}
                        className="flex justify-between items-center px-6 py-2 border-gray-600 border rounded-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
                                {getExpenseEmoji(item.category)}
                            </div>

                            <h1 className="text-xl">{item.category}</h1>
                        </div>

                        <div
                            className={`rounded font-semibold px-4 ${
                                item.total < 0
                                    ? "bg-red-200 text-red-600"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            ${item.total}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardExpense;
