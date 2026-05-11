import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { useEffect, useState } from "react";
import { loginImage } from "./utils";

const Navbar = () => {
    const [loginInfo, setLoginInfo] = useState(null);

    const fetchLogin = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setLoginInfo(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchLogin();
        }
    }, []);

    return (
        <>
            <div className="navbar-header bg-white border-b text-2xl py-2 px-4 font-bold cursor-pointer fixed w-full z-50">
                Expense Tracker
            </div>

            <div className="sidebar-container fixed h-screen w-64 border-r px-2 pt-20">
                {loginInfo && (
                    <div className="sidebar-profile-section">
                        <div className="sidebar-profile-image h-20 w-20 rounded-full left-1/2 relative -translate-x-1/2 flex items-center justify-center border-2 text-[55px] font-mono">
                            {loginImage("Yagna Vyas")}
                        </div>

                        <h2 className="sidebar-profile-name text-center text-2xl mt-6 font-semibold capitalize">
                            {loginInfo.name}
                        </h2>
                    </div>
                )}

                <div className="sidebar-links flex flex-col gap-4 mt-8">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `
                        sidebar-link dashboard-link
                        flex items-center gap-4 text-xl rounded-md py-1 px-2
                        ${
                            isActive
                                ? "sidebar-link-active bg-violet-600 text-white"
                                : "sidebar-link-hover hover:bg-gray-200"
                        }
                        `
                        }
                    >
                        <MdOutlineDashboard className="sidebar-link-icon" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/income"
                        className={({ isActive }) =>
                            `
                        sidebar-link income-link
                        flex items-center gap-4 text-xl rounded-md py-1 px-2
                        ${
                            isActive
                                ? "sidebar-link-active bg-violet-600 text-white"
                                : "sidebar-link-hover hover:bg-gray-200"
                        }
                        `
                        }
                    >
                        <IoWalletOutline className="sidebar-link-icon" />
                        Income
                    </NavLink>

                    <NavLink
                        to="/expense"
                        className={({ isActive }) =>
                            `
                        sidebar-link expense-link
                        flex items-center gap-4 text-xl rounded-md py-1 px-2
                        ${
                            isActive
                                ? "sidebar-link-active bg-violet-600 text-white"
                                : "sidebar-link-hover hover:bg-gray-200"
                        }
                        `
                        }
                    >
                        <GiReceiveMoney className="sidebar-link-icon" />
                        Expense
                    </NavLink>

                    <NavLink
                        to="/"
                        className="
                        sidebar-link logout-link
                        flex items-center gap-4 text-xl rounded-md py-1 px-2
                        hover:bg-red-500
                    "
                    >
                        <CiLogout className="sidebar-link-icon" />
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;
