import React, { useCallback, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { FiDownload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import IncomeModel from "../Components/Model/IncomeModel";
import axios from "axios";
import { getIncomeEmoji, getStartOfDay } from "../Components/utils";
import {
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const Income = () => {
    const [openModel, setOpenModel] = useState(false);
    const [income, setIncome] = useState([]);

    const each_sum = income.reduce((prev, curr) => {
        if (!prev[curr.category]) {
            prev[curr.category] = 0;
        }

        prev[curr.category] += curr.amount;

        return prev;
    }, {});

    const convertChartData = Object.entries(each_sum).map(
        ([category, amount]) => ({
            category,
            amount,
        }),
    );

    const fetchIncome = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/income`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setIncome(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchIncome();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="income-page-container ml-64 pt-14 bg-gray-100 min-h-[100vh] pb-4 relative">
                {openModel && (
                    <IncomeModel
                        closeModal={() => setOpenModel(false)}
                        refreshIncomes={fetchIncome}
                    />
                )}

                <div className="income-page-grid px-8 mt-8 grid grid-col-2 gap-8">
                    {/* Income Overview Chart */}
                    <div className="income-overview-card bg-white w-full h-[500px] shadow-md rounded-md">
                        <div className="income-overview-header flex justify-between p-4">
                            <div className="income-overview-title-section">
                                <h2 className="income-overview-title text-xl font-semibold">
                                    Income Overview
                                </h2>

                                <h2 className="income-overview-subtitle text-gray-500">
                                    Track your spending trends over time and
                                    gain insights into where your money goes
                                </h2>
                            </div>

                            <button
                                className="income-add-btn border text-nowrap flex items-center h-8 px-4 py-2 rounded bg-violet-100 text-violet-700 font-semibold gap-2"
                                onClick={() => setOpenModel(true)}
                            >
                                <FaPlus className="income-add-btn-icon" />
                                Add Income
                            </button>
                        </div>

                        <div className="income-chart-container">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={convertChartData}>
                                    <CartesianGrid
                                        strokeDasharray="4 4"
                                        className="income-chart-grid"
                                    />

                                    <XAxis
                                        dataKey="category"
                                        className="income-chart-xaxis"
                                    />

                                    <YAxis className="income-chart-yaxis" />

                                    <Tooltip className="income-chart-tooltip" />

                                    <Bar
                                        dataKey="amount"
                                        className="income-chart-bar"
                                    >
                                        {convertChartData.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        entry.category ===
                                                        "Salary"
                                                            ? "#22c55e"
                                                            : entry.category ===
                                                                "Youtube"
                                                              ? "#3b82f6"
                                                              : entry.category ===
                                                                  "Crypto"
                                                                ? "#f59e0b"
                                                                : entry.category ===
                                                                    "Stocks"
                                                                  ? "#ef4444"
                                                                  : "#a855f7"
                                                    }
                                                />
                                            ),
                                        )}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Income Sources */}
                    <div className="income-sources-card bg-white min-h-[100px] rounded-md shadow-md relative py-4 px-4">
                        <h2 className="income-sources-title text-2xl font-semibold">
                            Income Sources
                        </h2>

                        {/* Controls */}
                        <div className="income-controls absolute font-semibold right-4 top-4 flex gap-4">
                            <select className="income-sort-select border-black border rounded">
                                <option value="">Sort By</option>
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                                <option value="price">Price Low → High</option>
                                <option value="pricedesc">
                                    Price High → Low
                                </option>
                            </select>

                            <button className="income-download-btn px-2 py-1 flex items-center rounded bg-gray-200">
                                <FiDownload
                                    size={18}
                                    className="income-download-icon"
                                />
                                Download
                            </button>
                        </div>

                        {/* Income Grid */}
                        <div className="income-grid grid grid-cols-2 gap-2 mt-4">
                            {income && income.length > 0 ? (
                                [...income]
                                    .sort(
                                        (a, b) =>
                                            new Date(b.createdAt) -
                                            new Date(a.createdAt),
                                    )
                                    .slice(0, 12)
                                    .map((income, idx) => (
                                        <div
                                            key={income._id}
                                            className="income-card flex justify-between items-center gap-4 px-6 py-2"
                                        >
                                            <div className="income-card-left flex items-center gap-4">
                                                <div className="income-card-icon h-12 rounded-full w-12 border text-4xl bg-gray-200 text-center">
                                                    {getIncomeEmoji(
                                                        income.category,
                                                    )}
                                                </div>

                                                <div className="income-card-info">
                                                    <h1 className="income-card-category text-xl">
                                                        {income.category}
                                                    </h1>

                                                    <h1 className="income-card-date text-md text-gray-500">
                                                        {getStartOfDay(
                                                            income.createdAt,
                                                        )}
                                                    </h1>
                                                </div>
                                            </div>

                                            {income.amount > 0 ? (
                                                <div className="income-card-amount income-positive bg-green-200 text-green-600 rounded font-semibold px-4">
                                                    ${income.amount}
                                                </div>
                                            ) : (
                                                <div className="income-card-amount income-negative bg-red-200 text-red-600 rounded font-semibold px-4">
                                                    ${income.amount}
                                                </div>
                                            )}
                                        </div>
                                    ))
                            ) : (
                                <h1 className="income-empty-state text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
                                    Enter Something
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Income;
