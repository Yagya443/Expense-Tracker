import React, { useCallback } from "react";
import Navbar from "../Components/Navbar";
import { FiDownload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ExpenseModel from "../Components/Model/ExpenseModel";
import { getExpenseEmoji, getStartOfDay } from "../Components/utils";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const Expense = () => {
    const [expense, setExpense] = useState([]);
    const [openModel, setOpenModel] = useState(false);

    const formattedExpense = expense.map((item) => ({
        ...item,
        amount: Math.abs(item.amount),
    }));

    const each_sum = formattedExpense.reduce((prev, curr) => {
        if (!prev[curr.category]) {
            prev[curr.category] = 0;
        }
        prev[curr.category] = prev[curr.category] + curr.amount;
        return prev;
    }, {});

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

    const convertChartData = Object.entries(each_sum).map(
        ([category, amount]) => ({
            category,
            amount,
        }),
    );

    return (
        <>
            <Navbar />

            <div className="ml-64 pt-14 bg-gray-100 min-h-[100vh] pb-4">
                {openModel && (
                    <ExpenseModel
                        closeModal={() => setOpenModel(false)}
                        refreshExpenses={fetchExpense}
                    />
                )}

                <div className="px-8 mt-8 grid grid-col-2 gap-8 ">
                    <div className="bg-white w-full h-[500px] shadow-md rounded-md">
                        <div className="flex justify-between p-4">
                            <div>
                                <h2 className="text-xl">Expense Overview</h2>
                                <h2 className="text-gray-500">
                                    Track your spending trends over time and
                                    gain insights into where your money goes
                                </h2>
                            </div>

                            <button
                                className="border flex items-center h-8 px-4 py-2 rounded bg-violet-100 text-violet-700 font-semibold gap-2"
                                onClick={() => setOpenModel(true)}
                            >
                                <FaPlus /> Add Expenses
                            </button>
                        </div>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={convertChartData}>
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#7c3aed "
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white min-h-[100px] rounded-md shadow-md relative py-4 px-4">
                        <h2 className="text-2xl font-semibold">All Expenses</h2>

                        <div className="absolute font-semibold right-4 top-4  flex gap-4">
                            <select className="border-black border rounded">
                                <option value="">Sort By</option>
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                                <option value="price">Price Low → High</option>
                                <option value="pricedesc">
                                    Price High → Low
                                </option>
                            </select>
                            <button className="px-2 py-1 flex items-center rounded bg-gray-200">
                                <FiDownload size={18} />
                                Download
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2  ">
                            {expense && expense.length > 0 ? (
                                [...expense]
                                    .sort(
                                        (a, b) =>
                                            new Date(b.createdAt) -
                                            new Date(a.createdAt),
                                    )
                                    .slice(0, 12)
                                    .map((expense, idx) => (
                                        <div
                                            key={expense._id}
                                            className="flex justify-between items-center gap-4 px-6 py-2 "
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 rounded-full w-12 border text-4xl bg-gray-200 text-center">
                                                    {getExpenseEmoji(
                                                        expense.category,
                                                    )}
                                                </div>
                                                <div>
                                                    <h1 className="text-xl ">
                                                        {expense.category}
                                                    </h1>
                                                    <h1 className="text-md text-gray-500">
                                                        {getStartOfDay(
                                                            expense.createdAt,
                                                        )}
                                                    </h1>
                                                </div>
                                            </div>

                                            {expense.amount > 0 ? (
                                                <div className="bg-green-200 text-green-600 rounded font-semibold px-4">
                                                    ${expense.amount}
                                                </div>
                                            ) : (
                                                <div className="bg-red-200 text-red-600 rounded font-semibold px-4">
                                                    ${expense.amount}
                                                </div>
                                            )}
                                        </div>
                                    ))
                            ) : (
                                <h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2 ">
                                    Enter Something
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Expense;
