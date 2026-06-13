import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getExpenseEmoji, getIncomeEmoji, getStartOfDay } from "../utils";

const DashBoardRecent = () => {
    const [recentTran, setRecentTran] = useState([]);

    const fetchRecentTranc = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/recent-transaction`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setRecentTran(res.data);
            res.status(200).json(recentTransaction);
        } catch (error) {
            return;
            res.status(401).json({ message: error.message });
        }
    };

    useEffect(() => {
        fetchRecentTranc();
    }, []);

    return (
        <>
            <h2 className="recent-transaction-heading text-xl font-semibold">
                Recent Transactions
            </h2>

            <div className="recent-transaction-grid gap-2 mt-6 ">
                {recentTran && recentTran.length > 0 ? (
                    recentTran.slice(0, 10).map((recentTran, idx) => (
                        <div
                            className="recent-transaction-card flex justify-between items-center gap-4 px-6 py-2 border-gray-600 border rounded-lg"
                            key={recentTran._id}
                        >
                            <div className="recent-transaction-left flex items-center justify-center gap-4">
                                <div className="recent-transaction-icon h-12 rounded-full w-12 border text-4xl bg-gray-200 flex items-center justify-center">
                                    {recentTran.amount > 0
                                        ? getIncomeEmoji(recentTran.category)
                                        : getExpenseEmoji(recentTran.category)}
                                </div>

                                <div className="recent-transaction-info">
                                    <h1 className="recent-transaction-category text-xl">
                                        {recentTran.category}
                                    </h1>

                                    <h1 className="recent-transaction-date text-md text-gray-500 text-nowrap">
                                        {getStartOfDay(recentTran.createdAt)}
                                    </h1>
                                </div>
                            </div>

                            {recentTran.amount > 0 ? (
                                <div className="recent-transaction-income bg-green-200 text-green-600 rounded font-semibold px-4">
                                    ${recentTran.amount}
                                </div>
                            ) : (
                                <div className="recent-transaction-expense bg-red-200 text-red-600 rounded font-semibold px-4">
                                    ${recentTran.amount}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <h1 className="recent-transaction-empty text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
                        Enter Something
                    </h1>
                )}
            </div>
        </>
    );
};

export default DashBoardRecent;
