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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleRegister} className="p-6">
      
       <div className="flex gap-10">
        
            <div className="mb-6 text-center">
              <h1 className="font-bold text-3xl text-black mb-2">
                Create Admin
              </h1>
              <p className="text-gray-400 text-sm">
                Helping businesses streamline their workflow and boost productivity
              </p>
            </div>

            <button
            type="button"
              onClick={onClose}
              className="bg-indigo-100 text-indigo-700 font-medium md:w-12 md:h-12 lg:w-10 lg:h-10 w-7 h-7 hover:bg-indigo-200 rounded-lg flex items-center justify-center"
            >
              <X size={24} />
            </button>
       </div>


          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-medium mb-1 text-gray-600 text-sm">Full Name</h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none border border-gray-300 text-sm rounded-xl px-3 py-2 w-full"
                type="text"
                placeholder="Enter full name"
                autoComplete="off"
              />
            </div>

            <div>
              <h1 className="font-medium mb-1 text-gray-600 text-sm">Phone Number</h1>
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
                className="outline-none border border-gray-300 text-sm rounded-xl px-3 py-2 w-full"
                type="text"
                placeholder="Mobile number"
                autoComplete="new-password"
              />
            </div>

            <div>
              <h1 className="font-medium mb-1 text-sm text-gray-600">Work Email</h1>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border border-gray-300 text-sm rounded-xl px-3 py-2 w-full"
                type="email"
                placeholder="username@gmail.com"
                autoComplete="new-password"
              />
            </div>

            <div>
              <h1 className="font-medium mb-1 text-sm text-gray-600">Password</h1>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none border border-gray-300 text-sm rounded-xl px-3 py-2 pr-10 w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type unique password"
                />

                {showPassword ? (
                  <Eye
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={20}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={20}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className="z-50">
              <h1 className="font-medium mb-1  text-sm text-gray-600">Business Type</h1>
              <SADropdown
                value={businessType}
                options={businessTypes}
                onChange={setBusinessType}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 flex items-center justify-center gap-3 text-white px-4 py-2.5 rounded-xl w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Create Admin
            <MoveRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminAddAdmin;