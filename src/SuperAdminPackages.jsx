import React, { useEffect, useState } from "react";
import {
    IndianRupee,
    CheckCircle,
    Loader2,
    Plus,
    Trash2,
    PackageOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import SAdeletepopup from "./SAdeletepopup";
import SuperAdminAddPackage from "./SuperAdminAddPackage";

const BASE_URL = import.meta.env.VITE_API_URL;

const SuperAdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletePopup, setDeletePopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addPackageModal, setAddPackageModal] = useState(false);

    const getAllPackages = async () => {
        try {
            const res = await fetch(`${BASE_URL}/package/all-package`);
            const result = await res.json();

            if (result.success) {
                setPackages(result.data);
            } else {
                toast.error(result.message || "Failed to fetch packages");
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (id) => {
        try {
            const superAdminToken = localStorage.getItem("superAdminToken");

            const res = await fetch(`${BASE_URL}/package/delete-package/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${superAdminToken}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Error in deleting");
                return;
            }

            setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
            toast.success("Plan deleted successfully");
            setDeletePopup(false);
            setSelectedId(null);
            
        } catch (err) {
            console.log(err);
            toast.error("Error in deleting");
        }
    };

    useEffect(() => {
        getAllPackages();
    }, []);

    return (
        <div className="min-h-screen bg-indigo-50/50 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
                    <p className="text-gray-500 mt-1">
                        Manage all CRM subscription packages
                    </p>
                </div>

                <button
                    onClick={() => setAddPackageModal(true)}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                    <Plus size={18} />
                    Add Package
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-72">
                    <Loader2 className="animate-spin text-indigo-600" size={42} />
                </div>
            ) : packages.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                        <PackageOpen className="text-indigo-600" size={34} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                        No packages found
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Create your first package to show on pricing page.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                    {packages.map((pkg, index) => (
                        <div
                            key={pkg._id || index}
                            className="relative flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* {index === 1 && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                                    Popular
                                </span>
                            )} */}

                            <div className="border-b border-gray-200 pb-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {pkg.packageName}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {pkg.duration}
                                        </p>
                                    </div>

                                    <div className="flex items-center text-indigo-700 bg-indigo-50 rounded-xl px-3 py-2">
                                        <IndianRupee size={17} />
                                        <span className="font-bold">{pkg.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 mt-6 space-y-3">
                                {pkg.description?.split(",").map((item, index) => (
                                    <div key={index} className="flex gap-3 text-sm text-gray-600">
                                        <CheckCircle
                                            size={18}
                                            className="text-green-500 shrink-0 mt-0.5"
                                        />
                                        <span>{item.trim()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-5 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setSelectedId(pkg._id);
                                        setDeletePopup(true);
                                    }}
                                    className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 active:scale-[0.98] transition"
                                >
                                    <Trash2 size={17} />
                                    Delete Plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deletePopup && (
                <SAdeletepopup
                    onClose={() => {
                        setDeletePopup(false);
                        setSelectedId(null);
                    }}
                    onDelete={() => deletePlan(selectedId)}
                />
            )}

            {addPackageModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <SuperAdminAddPackage
                        addPackageModal={addPackageModal}
                        setAddPackageModal={setAddPackageModal}
                        getAllPackages={getAllPackages}
                    />
                </div>
            )}
        </div>
    );
};

export default SuperAdminPackages;