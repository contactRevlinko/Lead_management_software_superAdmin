import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_URL;
import toast from "react-hot-toast";

const SuperAdminRazorpaysettin = () => {
  const [razorpayKeyId, setRazorpayKeyId] = useState("");
  const [razorpayKeySecret, setRazorpayKeySecret] = useState("");

  const getSetting = async () => {
    try {
      const superAdminToken = localStorage.getItem("superAdminToken")
      const res = await fetch(`${BASE_URL}/razorpay-setting/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${superAdminToken}`,
        }
      })
      const result = await res.json();
      if (result.success && result.data) {
        setRazorpayKeyId(result.data.razorpayKeyId || "");
        setRazorpayKeySecret(result.data.razorpayKeySecret || "");
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  const saveSetting = async () => {
    if (!razorpayKeyId || !razorpayKeySecret) {
      toast.error("Key ID and Secret required");
      return;
    }

    try {
      const superAdminToken = localStorage.getItem("superAdminToken");

      const res = await fetch(`${BASE_URL}/razorpay-setting/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${superAdminToken}`,
        },
        body: JSON.stringify({
          razorpayKeyId,
          razorpayKeySecret,
        }),
      });

      const result = await res.json();
      console.log(result);
      if (result.success) {
        toast.success("Razorpay Setting Saved");
      } else {
        toast.error(result.message || "Failed to save");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Razorpay Settings
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Save Razorpay Key ID and Secret. Backend will use these keys to create Razorpay order.
        </p>
      </div>

        <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm w-full max-w-2xl">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Razorpay Key ID
            </label>

            <input
              type="text"
              value={razorpayKeyId}
              onChange={(e) => setRazorpayKeyId(e.target.value)}
              placeholder="rzp_test_xxxxxxxxxx"
              className="w-full h-11 bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Razorpay Key Secret
            </label>

            <input
              type="text"
              value={razorpayKeySecret}
              onChange={(e) => setRazorpayKeySecret(e.target.value)}
              placeholder="Enter Razorpay Secret"
              className="w-full h-11 bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
            />
          </div>
          <button
            type="button"
            onClick={saveSetting}
            className="w-auto h-11 bg-indigo-600 text-white font-semibold px-6 rounded-xl shadow-sm shadow-indigo-100/30 hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            Save Settings
          </button>

        </div>

      </div>
  )
}

export default SuperAdminRazorpaysettin