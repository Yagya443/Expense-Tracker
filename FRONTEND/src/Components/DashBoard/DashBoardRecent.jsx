import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getExpenseEmoji, getIncomeEmoji, getStartOfDay } from "../utils";

const DashBoardRecent = () => {
    const [recentTran, setRecentTran] = useState(null);

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
            console.log("Hello");
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
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <button className="absolute rounded py-1 bg-gray-100 font-semibold px-3 right-4 top-4 flex items-center gap-2">
                See All <FaArrowRight />
            </button>
            <div className="grid grid-cols-2     gap-2 mt-4 ">
                {recentTran && recentTran.length > 0 ? (
                    recentTran.map((recentTran, idx) => (
                        <div
                            key={recentTran._id}
                            className="flex justify-between items-center gap-4 px-6 py-2 "
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 rounded-full w-12 border text-4xl bg-gray-200 text-center">
                                    {
                                        
                                    }
                                    {getIncomeEmoji(recentTran.category)}

                                    ||
                                    {getExpenseEmoji(recentTran.category)}

                                </div>
                                <div>
                                    <h1 className="text-xl ">
                                        {recentTran.category}
                                    </h1>
                                    <h1 className="text-md text-gray-500">
                                        {getStartOfDay(recentTran.createdAt)}
                                    </h1>
                                </div>
                            </div>

                            {recentTran.amount > 0 ? (
                                <div className="bg-green-200 text-green-600 rounded font-semibold px-4">
                                    ${recentTran.amount}
                                </div>
                            ) : (
                                <div className="bg-red-200 text-red-600 rounded font-semibold px-4">
                                    ${recentTran.amount}
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
        </>
    );
};

export default DashBoardRecent;
