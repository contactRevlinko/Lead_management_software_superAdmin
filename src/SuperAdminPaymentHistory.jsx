import React, { useEffect, useState } from "react";
import { IndianRupee, Users } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const SuperAdminPaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    const getAllPayments = async () => {
        try {
            const superAdminToken = localStorage.getItem("superAdminToken");

            const res = await fetch(`${BASE_URL}/payment/all-admin-package`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${superAdminToken}`,
                },
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message || "Error fetching payments");
                return;
            }

            setPayments(result.data || []);
        } catch (err) {
            console.log(err);
            toast.error("Server error");
        }
    };

    useEffect(() => {
        getAllPayments();
    }, []);

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Payment History
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    All admin package payment details
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-20 lg:hidden">
                {payments.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl border border-slate-200/60 p-10 text-center shadow-sm">
                        <Users className="mx-auto mb-3 w-12 h-12 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-700">
                            No Payments Found
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Payment history will appear here.
                        </p>
                    </div>
                ) : (
                    payments.map((payment, index) => (
                        <div
                            key={payment._id}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 hover:shadow-md transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="mb-4 flex justify-between items-start">
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900 capitalize">
                                         {index + 1} {payment.adminId?.name}
                                    </h1>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Payment Details
                                    </p>
                                </div>

                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${payment.paymentVerified
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {payment.paymentVerified ? "Verified" : "Pending"}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                    <p className="text-gray-500">Email</p>
                                    <p className="text-gray-800 font-medium truncate">
                                        {payment.adminId?.email}
                                    </p>
                                </div>

                                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                    <p className="text-gray-500">Phone</p>
                                    <p className="text-gray-800 font-medium">
                                        {payment.adminId?.phone}
                                    </p>
                                </div>

                                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                    <p className="text-gray-500">Package</p>
                                    <p className="text-gray-800 font-medium">
                                        {payment.packageName}
                                    </p>
                                </div>

                                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                    <p className="text-gray-500">Duration</p>
                                    <p className="text-gray-800 font-medium">
                                        {payment.packageId?.duration}
                                    </p>
                                </div>

                                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                    <p className="text-gray-500">Amount</p>
                                    <p className="text-indigo-700 font-bold">
                                        ₹ {payment.packagePrice}
                                    </p>
                                </div>

                                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                    <p className="text-gray-500">Date</p>
                                    <p className="text-gray-800 font-medium">
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString()
                                            : "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="bg-white hidden md:hidden lg:block rounded-2xl shadow-sm border border-slate-200/60 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-indigo-50/60 border-b border-slate-200/80">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Sr No.</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Admin Name</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Admin Id</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Phone</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Package Name</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Duration</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Package Price</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Payment Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Razorpay Order ID</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Razorpay Payment ID</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Payment Date</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Package Expiry Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className="border-b border-slate-100 text-left hover:bg-slate-50/60 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{index + 1}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.adminId?.name || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.adminId?._id || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.adminId?.email || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.adminId?.phone || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.packageName || payment.packageId?.packageName || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.packageId?.duration || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        <div className="flex items-center text-indigo-700 font-semibold">
                                            <IndianRupee size={15} />
                                            {payment.packagePrice || payment.packageId?.price || 0}
                                        </div>
                                    </td>

                                    <td className="px-6 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.paymentVerified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {payment.paymentVerified ? "Verified" : "Pending"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.razorpayOrderId || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.razorpayPaymentId || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {payment.adminId?.packageExpiryDate
                                            ? new Date(payment.adminId.packageExpiryDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="13"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No payment history found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminPaymentHistory;