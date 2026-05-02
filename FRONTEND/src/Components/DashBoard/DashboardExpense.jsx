import React from "react";
import { FaArrowRight } from "react-icons/fa";

const DashboardExpense = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold">Expenses</h2>
            <button className="absolute rounded py-1 bg-gray-100 font-semibold px-3 right-4 top-4 flex items-center gap-2">
                See All <FaArrowRight />
            </button>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between items-center gap-4 px-6">
                    <div className="flex items-center gap-4">
                        <img
                            className="h-12 rounded-full w-12 "
                            src="https://images.unsplash.com/photo-1776977496468-2823fb2daa01?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                        <div>
                            <h1 className="text-xl ">Shopping</h1>
                            <h1 className="text-md text-gray-500">
                                17 Feb 2026
                            </h1>
                        </div>
                    </div>

                    <div className="bg-red-200 text-red-600 rounded font-semibold px-4">
                        -$400
                    </div>
                </div>

                <div className="flex justify-between items-center gap-4 px-6">
                    <div className="flex items-center gap-4">
                        <img
                            className="h-12 rounded-full w-12 "
                            src="https://images.unsplash.com/photo-1776977496468-2823fb2daa01?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                        <div>
                            <h1 className="text-xl ">Shopping</h1>
                            <h1 className="text-md text-gray-500">
                                17 Feb 2026
                            </h1>
                        </div>
                    </div>

                    <div className="bg-red-200 text-red-600 rounded font-semibold px-4">
                        -$400
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardExpense;
