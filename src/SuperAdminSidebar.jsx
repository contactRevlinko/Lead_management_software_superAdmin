import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    UserRoundSearch,
    Calendar,
    BellRing,
    ChartLine,
    Users,
    Settings,
    X,
} from "lucide-react";


const SuperAdminSidebar = ({ showSideBar, handleSideBar }) => {
    const navClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
    ${isActive
            ? "bg-indigo-100 text-indigo-700 font-semibold border-r-4 border-indigo-600"
            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
        }`;

    return (
        <div
            className={`
        fixed left-0 top-0 h-screen w-72
         bg-indigo-50/50
        p-5 border-r border-gray-200 z-50
        transition-transform duration-300
        ${showSideBar ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
        >
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-700">LeadPro</h1>
                    <p className="text-gray-500 text-sm">Enterprise CRM</p>
                </div>

                <button
                    onClick={handleSideBar}
                    className="lg:hidden bg-indigo-600 text-white w-9 h-9 rounded-full flex items-center justify-center"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <NavLink to="/dashboard" className={navClass}>
                    <LayoutDashboard size={22} />
                    Dashboard
                </NavLink>

                <NavLink to="/admin-manage" className={navClass}>
                    <UserRoundSearch size={22} />
                    admin manage
                </NavLink>

                <NavLink to="/packages" className={navClass}>
                    <Calendar size={22} />
                    packages
                </NavLink>

                <NavLink to="/payment-history" className={navClass}>
                    <BellRing size={22} />
                    payment history
                </NavLink>

                <NavLink to="/razorpay-setting" className={navClass}>
                    <BellRing size={22} />
                    razorpay settings
                </NavLink>


            </div>
        </div>
    );
};




export default SuperAdminSidebar;