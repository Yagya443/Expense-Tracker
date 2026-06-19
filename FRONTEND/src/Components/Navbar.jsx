import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { loginImage } from "./utils";

const Navbar = () => {
    const [loginInfo, setLoginInfo] = useState(null);
    const [displayNavbarIcon, setDisplayNavbarIcon] = useState(false);
    const [openSlidebar, setOpenSlidebar] = useState(false);

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

    useEffect(() => {
        const handleResize = () => {
            setDisplayNavbarIcon(window.innerWidth < 500);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("token");
    };

    function navbar3Lines() {
        setOpenSlidebar(!openSlidebar);
    }

    // console.log("displayNavbarIcon", displayNavbarIcon);

    return (
        <>
            <div className="navbar-header bg-white border-b text-2xl py-2 px-4 font-bold cursor-pointer fixed w-full z-10">
                Expense Tracker
            </div>

            <div
                className={`
                    sidebar-container top-0 fixed h-screen w-64 bg-white border-r px-2 pt-20 transition-all duration-300
                    ${
                        displayNavbarIcon
                            ? !openSlidebar
                                ? "right-0 z-20 "
                                : "-right-64 z-20"
                            : "left-0"
                    }
                `}
            >
                {displayNavbarIcon && (
                    <div
                        className="navbar-icon fixed top-4 right-2 flex gap-1  flex-col z-20 "
                        onClick={navbar3Lines}
                    >
                        <div
                            className={`navbar-icon-1 h-1 w-10 duration-150 z-20 transition-all bg-black  ${!openSlidebar && "-rotate-45 translate-y-1"}`}
                        ></div>
                        <div
                            className={`navbar-icon-2 h-1 w-10 duration-150 z-20 transition-all bg-black ${!openSlidebar && "hidden "}`}
                        ></div>
                        <div
                            className={`navbar-icon-1 h-1 w-10 duration-150 z-20 transition-all bg-black ${!openSlidebar && "rotate-45 -translate-y-1"}`}
                        ></div>
                    </div>
                )}
                {loginInfo && (
                    <div className="sidebar-profile-section">
                        <div className="sidebar-profile-image h-20 w-20 rounded-full left-1/2 relative -translate-x-1/2 flex items-center justify-center border-2 text-[55px] font-mono">
                            {loginImage(loginInfo.name)}
                        </div>

                        <h2 className="sidebar-profile-name text-center text-2xl mt-6 font-semibold capitalize">
                            {loginInfo.name}
                        </h2>
                    </div>
                )}

                <div className="sidebar-links flex flex-col gap-4 mt-8">
                    <NavLink
                        to="/dashboard"
                        onClick={() => setOpenSlidebar(false)}
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
                        onClick={() => setOpenSlidebar(false)}
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
                        onClick={() => setOpenSlidebar(false)}
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
                        onClick={handleLogOut}
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
