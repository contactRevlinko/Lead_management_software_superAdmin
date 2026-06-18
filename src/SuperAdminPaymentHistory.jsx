import React, { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
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
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Payment History
                </h1>
                <p className="text-gray-500 mt-1">
                    All admin package payment details
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-indigo-50 text-gray-700">
                        <tr>
                            <th className="px-5 py-4">Sr No.</th>
                            <th className="px-5 py-4">Admin Name</th>
                            <th className="px-5 py-4">Admin Id</th>
                            <th className="px-5 py-4">Email</th>
                            <th className="px-5 py-4">Phone</th>
                            <th className="px-5 py-4">Package Name</th>
                            <th className="px-5 py-4">Duration</th>
                            <th className="px-5 py-4">Package Price</th>
                            <th className="px-5 py-4">Payment Status</th>
                            <th className="px-5 py-4">Razorpay Order ID</th>
                            <th className="px-5 py-4">Razorpay Payment ID</th>
                            <th className="px-5 py-4">Package Expiry Date</th>
                            <th className="px-5 py-4">Payment Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className="border-t border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">{index + 1}</td>

                                    <td className="px-5 py-4 font-medium">
                                        {payment.adminId?.name || "-"}
                                    </td>
                                    <td className="px-5 py-4 font-medium">
                                        {payment.adminId?._id || "-"}
                                    </td>
                                    <td className="px-5 py-4">
                                        {payment.adminId?.email || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        {payment.adminId?.phone || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        {payment.packageName || payment.packageId?.packageName || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        {payment.packageId?.duration || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center text-indigo-700 font-semibold">
                                            <IndianRupee size={15} />
                                            {payment.packagePrice || payment.packageId?.price || 0}
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.paymentVerified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {payment.paymentVerified ? "Verified" : "Pending"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        {payment.razorpayOrderId || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        {payment.razorpayPaymentId || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString("en-IN")
                                            : "-"}
                                    </td>
                                    <td className="px-5 py-4">
                                        {payment.adminId.packageExpiryDate || "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="11"
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