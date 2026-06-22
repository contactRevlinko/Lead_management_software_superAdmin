import React, { useState } from "react";
import { Eye, EyeOff, MoveRight, X } from "lucide-react";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../src/config/validate";
import SADropdown from "./SADropdown";

const BASE_URL = import.meta.env.VITE_API_URL;

const businessTypes = [
  "Wholesaler", "Retailer", "Distributor", "Manufacturer", "Supplier",
  "Trader", "Importer", "Exporter", "Dealer", "Service Provider",
  "Agency", "Franchise", "Consultant", "Freelancer", "Startup", "other",
];

const SuperAdminAddAdmin = ({ onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !password || !businessType) {
      toast.error("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Please enter 10 digit phone number");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must contain 8+ characters, uppercase, lowercase, number and special character");
      return;
    }

    try {
      const superAdminToken = localStorage.getItem("superAdminToken");

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${superAdminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          businessType,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Admin create failed");
        return;
      }

      toast.success("Admin created successfully");
      onSuccess(result.data);
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl border border-slate-200/60 shadow-xl overflow-visible">
        <form onSubmit={handleRegister} className="p-6">
          <div className="flex items-start justify-between mb-6 border-b border-gray-100 pb-4">
            <div>
              <h1 className="font-bold text-2xl text-slate-900 tracking-tight">
                Add Admin
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Create a new administrator account
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>


          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                type="text"
                placeholder="Enter full name"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");

                  if (value.length > 10) {
                    if (value.length >= 12 && value.startsWith("91")) {
                      toast.error("Please enter 10 digit number without +91");
                    } else {
                      toast.error("Only 10 digits allowed");
                    }
                    return;
                  }

                  setPhone(value);
                }}
                className="w-full h-11 bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                type="text"
                placeholder="Mobile number"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Work Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                type="email"
                placeholder="username@gmail.com"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 bg-slate-50/50 border border-slate-200/60 rounded-xl pl-4 pr-10 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type unique password"
                />

                {showPassword ? (
                  <Eye
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    size={18}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    size={18}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Business Type</label>
              <SADropdown
                value={businessType}
                options={businessTypes}
                onChange={setBusinessType}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 flex items-center justify-center gap-2 h-11 w-full bg-indigo-600 text-white rounded-xl font-semibold shadow-sm shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150"
          >
            Create Admin
            <MoveRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminAddAdmin;