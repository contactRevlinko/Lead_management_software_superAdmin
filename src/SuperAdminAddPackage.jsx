import React, { useEffect, useState } from "react";
import { PackageCheck, IndianRupee, Clock, CalendarDays, FileText, X } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const SuperAdminAddPackage = ({ setAddPackageModal, getAllPackages, addPackageModal }) => {
    const [form, setForm] = useState({
        packageName: "",
        description: "",
        price: "",
        duration: "",
        durationInDays: "",
    });


    useEffect(() => {
        if (addPackageModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [addPackageModal]);


    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const createPlan = async () => {
        try {
            if (!form.packageName || !form.price || !form.duration || !form.durationInDays) {
                toast.error("Package name, price, duration and duration days required");
                return;
            }

            const superAdminToken = localStorage.getItem("superAdminToken");

            const res = await fetch(`${BASE_URL}/package/create-package`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${superAdminToken}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Error creating package");
                return;
            }

            toast.success("Plan added successfully");

            setForm({
                packageName: "",
                description: "",
                price: "",
                duration: "",
                durationInDays: "",
            });

            getAllPackages();
            setAddPackageModal(false);
        } catch (err) {
            console.log(err);
            toast.error("Server error");
        }
    };



    return (
        <div className="relative bg-white w-full max-w-lg rounded-2xl border border-slate-200/60 shadow-xl overflow-visible p-6">
            <div className="flex justify-between border-b border-gray-100 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Create New Plan
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Add new subscription package plan</p>
                </div>

                <button
                    type="button"
                    onClick={() => setAddPackageModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

                <div className="lg:my-5 md:my-3 my-2 w-full">
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Plan Name</label>
                    <div className="flex items-center gap-2 border border-slate-200/60 rounded-xl px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all duration-200">
                        <PackageCheck size={18} className="text-slate-400 shrink-0" />
                        <input
                            className="outline-none w-full text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400"
                            placeholder="Plan name"
                            name="packageName"
                            value={form.packageName}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="lg:my-5 md:my-3 my-2 w-full">
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Description</label>
                    <div className="flex gap-2 border border-slate-200/60 rounded-xl px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all duration-200">
                        <FileText size={18} className="text-slate-400 shrink-0 mt-0.5" />
                        <textarea
                            className="outline-none w-full text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400 resize-none"
                            placeholder="Example: 100 leads, Team management, Analytics"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Price</label>
                        <div className="flex items-center gap-2 border border-slate-200/60 rounded-xl px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all duration-200">
                            <IndianRupee size={18} className="text-slate-400 shrink-0" />
                            <input
                                className="outline-none w-full text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400"
                                placeholder="Enter price"
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Duration</label>
                        <div className="flex items-center gap-2 border border-slate-200/60 rounded-xl px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all duration-200">
                            <Clock size={18} className="text-slate-400 shrink-0" />
                            <input
                                className="outline-none w-full text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400"
                                placeholder="Monthly / Yearly"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:my-5 md:my-3 my-2 w-full">
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Duration In Days</label>
                    <div className="flex items-center gap-2 border border-slate-200/60 rounded-xl px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all duration-200">
                        <CalendarDays size={18} className="text-slate-400 shrink-0" />
                        <input
                            className="outline-none w-full text-sm font-medium text-slate-800 bg-transparent placeholder-slate-400"
                            placeholder="30 / 365"
                            name="durationInDays"
                            type="number"
                            value={form.durationInDays}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            <button
                className="mt-4 flex items-center justify-center gap-2 h-11 w-full bg-indigo-600 text-white rounded-xl font-semibold shadow-sm shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150"
                onClick={createPlan}
            >
                Save Plan
            </button>
        </div>
    );
};

export default SuperAdminAddPackage;