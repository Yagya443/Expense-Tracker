import React from "react";
import Navbar from "../Components/Navbar";
import { FiDownload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import IncomeModel from "../Components/Model/IncomeModel";

const Income = () => {
    const [openModel, setOpenModel] = useState(false);

    return (
        <div>
            <Navbar />

            <div className="ml-64 pt-14 bg-gray-100 min-h-[100vh] pb-4 relative">
                            {openModel && <IncomeModel closeModal={()=>setOpenModel(false)}/>}
                <div className="px-8 mt-8 grid grid-col-2 gap-8 ">
                    <div className="bg-white w-full h-[500px] shadow-md rounded-md">
                        <div className="flex justify-between p-4">
                            <div>
                                <h2 className="text-xl">Income Overview</h2>
                                <h2 className="text-gray-500">
                                    Track your spending trends over time and
                                    gain insights into where your money goes
                                </h2>
                            </div>

                            <button
                                className="border flex items-center h-8 px-4 py-2 rounded bg-violet-100 text-violet-700 font-semibold gap-2"
                                onClick={() => setOpenModel(true)}
                            >
                                <FaPlus /> Add Income
                            </button>

                        </div>
                    </div>
                    <div className="bg-white min-h-[100px] rounded-md shadow-md relative py-4 px-4">
                        <h2 className="text-2xl font-semibold">
                            Income Sources
                        </h2>

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


                        <div className="grid grid-cols-2 gap-2 mt-4 ">
                            <div className="flex justify-between items-center gap-4 px-6 py-2">
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

                                <div className="bg-green-200 text-green-600 rounded font-semibold px-4">
                                    -$400
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Income;
