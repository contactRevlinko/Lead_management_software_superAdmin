import React, { useEffect, useRef, useState } from "react";
import { UserPlus, PanelRight, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("superAdminUser"));

const SuperAdminTopbar = ({ handleSideBar }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const boxRef = useRef();

    const user = JSON.parse(localStorage.getItem("superAdminUser"));

    const handleLogout = () => {
        localStorage.removeItem("superAdminToken");
        localStorage.removeItem("superAdminUser");
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    return (
        <div className="backdrop-blur-md justify-between lg:justify-end fixed top-0 left-0 right-0 lg:left-72 h-20 lg:px-12 px-4 bg-white/80 border-b border-slate-200/60 shadow-sm z-40 flex items-center gap-3">
            <PanelRight
                onClick={handleSideBar}
                className="lg:hidden cursor-pointer text-slate-500 hover:text-slate-700 transition-colors w-6 h-6"
            />

            <div className="flex gap-5 shrink-0">
                <div className="relative" ref={boxRef}>
                    <UserPlus
                        onClick={() => setOpen(!open)}
                        className="cursor-pointer"
                    />

                    {open && (
                        <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/60 p-4 z-50">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center font-bold text-lg shadow-sm">
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <h2 className="mt-3 text-sm font-bold text-slate-800 tracking-tight">
                                    {user?.name}
                                </h2>

                                <div className="w-12 h-[1px] bg-slate-200/80 my-3"></div>
                            </div>

                            <div className="space-y-2">
                                <div className="bg-slate-50/50 border border-slate-100/50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                                        Phone
                                    </span>
                                    <span className="text-xs text-slate-700 font-medium tabular-nums">
                                        {user?.phone || "-"}
                                    </span>
                                </div>

                                <div className="bg-slate-50/50 border border-slate-100/50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                                        Email
                                    </span>
                                    <span className="text-xs text-slate-700 font-medium max-w-[120px] truncate">
                                        {user?.email}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full mt-4 flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 text-sm font-semibold py-2 rounded-xl hover:bg-red-100 hover:border-red-300 active:scale-[0.98] transition-all duration-150"
                            >
                                <Power size={14} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminTopbar;