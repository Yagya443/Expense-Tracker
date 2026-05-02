import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
    return (
        <>
            <div className="bg-white border-b text-2xl py-2 px-4 font-bold cursor-pointer fixed w-full z-50">Expense Tracker</div>
            <div className="fixed h-screen w-64 border-r px-2 pt-20">
                <div>
                    <img
                        className="h-20 w-20 rounded-full left-1/2 relative -translate-x-1/2"
                        src="https://plus.unsplash.com/premium_photo-1777023616744-05bb1f9e7620?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <h2 className="text-center text-2xl mt-6 font-semibold">Mike Willams</h2>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `
                        flex items-center gap-4 text-xl rounded-md py-1 px-2 
                        
                        ${isActive ? "bg-violet-600 text-white " : 'hover:bg-gray-200'}`
                        }
                    >
                        <MdOutlineDashboard />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/income"
                        className={({ isActive }) =>
                            `
                    flex items-center gap-4 text-xl rounded-md py-1 px-2
                    
                                                ${isActive ? "bg-violet-600 text-white " : 'hover:bg-gray-200'}`

                        }
                    >
                        <IoWalletOutline />
                        Income
                    </NavLink>
                    <NavLink
                        to="/expense"
                        className={({ isActive }) =>
                            `
                    flex items-center gap-4 text-xl rounded-md py-1 px-2
                        ${isActive ? "bg-violet-600 text-white " : 'hover:bg-gray-200'}`
                    
                        }
                    >
                        <GiReceiveMoney />
                        Expense
                    </NavLink>

                    <NavLink
                        to="/"
                        className={`
                        flex items-center gap-4 text-xl rounded-md py-1 px-2
                        hover:bg-red-500
                        `}
                    >
                        <CiLogout />
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;
