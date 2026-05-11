import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { IoMdCard } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import Chart from "../Components/DashBoard/PieChart";
import DashboardExpense from "../Components/DashBoard/DashboardExpense";
import DashBoardRecent from "../Components/DashBoard/DashBoardRecent";
import PieChart from "../Components/DashBoard/PieChart";
import Bargraph from "../Components/DashBoard/BarGraph";
import DashboardIncome from "../Components/DashBoard/DashboardIncome";
import IncomeGraph from "../Components/DashBoard/IncomeGraph";
import axios from "axios";

const Dashboard = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const fetchTotalIncome = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/totalIncome`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setTotalIncome(res.data.total);
        } catch (error) {
            console.error(error);
        }
    }, []);
    const fetchTotalExpense = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/totalExpense`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setTotalExpense(res.data.total);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchTotalIncome();
        fetchTotalExpense();
    }, []);

    return (
        <>
            <Navbar />

            <div className="dashboard-container ml-64 pt-20 bg-gray-100 min-h-[100vh] pb-4">
                {/* Top Cards */}
                <div className="dashboard-summary-grid grid grid-cols-3 px-8 gap-4">
                    {/* Total Balance */}
                    <div className="dashboard-card total-balance-card bg-white rounded-xl h-24 flex gap-4 items-center pl-4 shadow-lg">
                        <div className="dashboard-card-icon total-balance-icon bg-violet-500 h-16 flex items-center justify-center w-16 rounded-full">
                            <IoMdCard size={40} />
                        </div>

                        <div className="dashboard-card-content">
                            <p className="dashboard-card-title text-xl text-gray-700">
                                Total Balance
                            </p>

                            <h2 className="dashboard-card-amount text-2xl font-semibold">
                                ${totalIncome + totalExpense}
                            </h2>
                        </div>
                    </div>

                    {/* Total Income */}
                    <div className="dashboard-card total-income-card bg-white rounded-xl h-24 flex gap-4 items-center pl-4 shadow-lg">
                        <div className="dashboard-card-icon total-income-icon bg-yellow-400 h-16 flex items-center justify-center w-16 rounded-full">
                            <CiWallet size={40} />
                        </div>

                        <div className="dashboard-card-content">
                            <p className="dashboard-card-title text-xl text-gray-700">
                                Total Income
                            </p>

                            <h2 className="dashboard-card-amount text-2xl font-semibold">
                                ${totalIncome}
                            </h2>
                        </div>
                    </div>

                    {/* Total Expense */}
                    <div className="dashboard-card total-expense-card bg-white rounded-xl h-24 flex gap-4 items-center pl-4 shadow-lg">
                        <div className="dashboard-card-icon total-expense-icon bg-red-500 h-16 flex items-center justify-center w-16 rounded-full">
                            <GiReceiveMoney size={40} />
                        </div>

                        <div className="dashboard-card-content">
                            <p className="dashboard-card-title text-xl text-gray-700">
                                Total Expense
                            </p>

                            <h2 className="dashboard-card-amount text-2xl font-semibold">
                                ${Math.abs(totalExpense)}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="dashboard-content-grid px-8 mt-8 grid grid-cols-2 gap-8">
                    {/* Recent Transactions */}
                    <div className="dashboard-widget recent-transaction-widget bg-white min-h-[300px] rounded-md relative py-4 px-4 shadow-md">
                        <DashBoardRecent />
                    </div>

                    {/* Pie Chart */}
                    <div className="dashboard-widget piechart-widget bg-white min-h-[500px] rounded-md shadow-md">
                        <PieChart />
                    </div>

                    {/* Bar Graph */}
                    <div className="dashboard-widget bargraph-widget bg-white min-h-[400px] rounded-md relative py-4 px-4 shadow-md">
                        <Bargraph />
                    </div>

                    {/* Expense Dashboard */}
                    <div className="dashboard-widget expense-widget bg-white min-h-[400px] rounded-md relative py-4 px-4 shadow-md">
                        <DashboardExpense />
                    </div>

                    {/* Income Dashboard */}
                    <div className="dashboard-widget income-widget bg-white min-h-[400px] rounded-md relative py-4 px-4 shadow-md">
                        <DashboardIncome />
                    </div>

                    {/* Income Graph */}
                    <div className="dashboard-widget income-graph-widget bg-white min-h-[400px] rounded-md relative py-4 px-4 shadow-md">
                        <IncomeGraph />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
