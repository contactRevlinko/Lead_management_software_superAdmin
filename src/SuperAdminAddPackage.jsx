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
        <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden p-6">
            <div className="flex justify-between border-b border-gray-100 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Create New Plan
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Add new subscription package plan</p>
                </div>

                <button
                    type="button"
                    onClick={() => setAddPackageModal(false)}
                    className="bg-indigo-100 text-indigo-700 font-medium md:w-12 md:h-12 lg:w-10 lg:h-10 w-7 h-7 hover:bg-indigo-200 rounded-lg flex items-center justify-center"
                >
                    <X size={18} />
                </button>
            </div>

                <div className="lg:my-5 md:my-3 my-2 w-full">
                    <p className="text-sm mb-1 font-medium">Plan Name</p>
                    <div className={`${form.packageName ? "bg-indigo-50" : "bg-white"} flex border border-gray-300 gap-2 p-2 rounded-xl`}>
                        <PackageCheck size={17} />
                        <input
                            className="outline-none w-full text-sm bg-transparent"
                            placeholder="Plan name"
                            name="packageName"
                            value={form.packageName}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="lg:my-5 md:my-3 my-2 w-full">
                    <p className="text-sm mb-1 font-medium">Description</p>
                    <div className={`${form.description ? "bg-indigo-50" : "bg-white"} flex border border-gray-300 gap-2 p-2 rounded-xl`}>
                        <FileText size={17} />
                        <textarea
                            className="outline-none w-full text-sm bg-transparent resize-none"
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
                        <p className="text-sm mb-1 font-medium">Price</p>
                        <div className={`${form.price ? "bg-indigo-50" : "bg-white"} flex border border-gray-300 gap-2 p-2 rounded-xl`}>
                            <IndianRupee size={17} />
                            <input
                                className="outline-none w-full text-sm bg-transparent"
                                placeholder="Enter price"
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm mb-1 font-medium">Duration</p>
                        <div className={`${form.duration ? "bg-indigo-50" : "bg-white"} flex border border-gray-300 gap-2 p-2 rounded-xl`}>
                            <Clock size={17} />
                            <input
                                className="outline-none w-full text-sm bg-transparent"
                                placeholder="Monthly / Yearly"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:my-5 md:my-3 my-2 w-full">
                    <p className="text-sm mb-1 font-medium">Duration In Days</p>
                    <div className={`${form.durationInDays ? "bg-indigo-50" : "bg-white"} flex border border-gray-300 gap-2 p-2 rounded-xl`}>
                        <CalendarDays size={17} />
                        <input
                            className="outline-none w-full text-sm bg-transparent"
                            placeholder="30 / 365"
                            name="durationInDays"
                            type="number"
                            value={form.durationInDays}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                            <button
                className="w-full h-10 md:mt-5 text-white bg-indigo-700 rounded cursor-pointer hover:bg-indigo-800"
                onClick={createPlan}
            >
                Save Plan
            </button>
        </div>
    );
};

export default SuperAdminAddPackage;