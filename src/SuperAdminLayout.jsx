import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminTopbar from "./SuperAdminTopbar";

const SuperAdminLayout = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    const token = localStorage.getItem("superAdminToken");

    if (!token) {
        return <Navigate to="/" />;
    }

    const handleSideBar = () => {
        setShowSideBar((prev) => !prev);
    };

    return (
        <div className="bg-indigo-50/50 min-h-screen overflow-x-hidden">
            {showSideBar && (
                <div
                    onClick={handleSideBar}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                />
            )}

            <SuperAdminSidebar
                handleSideBar={handleSideBar}
                showSideBar={showSideBar}
            />

            <div className="lg:ml-72 min-h-screen">
                <SuperAdminTopbar handleSideBar={handleSideBar} />

                <main className="pt-24 mx-5 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;