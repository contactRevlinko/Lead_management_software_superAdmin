import React, { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import { validateEmail } from '../../frontend/src/utils/validation';
import { validatePassword } from '../../frontend/src/utils/validation';
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const SuperAdminLogin = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!validatePassword(password)) {
            toast.error(
                "Password must contain 8+ characters, uppercase, lowercase, number and special character"
            );
            return;
        }
        try {

            const res = await fetch(`${BASE_URL}/super-admin/login-sa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message || "Invalid credentials");
                return;
            }

            localStorage.setItem("superAdminToken", result.token);
            localStorage.setItem("superAdminUser", JSON.stringify(result.superAdmin));
             navigate("/dashboard");
            toast.success(result.message);
            
        

        }

        catch (err) {
            console.log(err)
            toast.error("something went wrong")
        }
    }




    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="bg-slate-50 px-10 shadow-lg   flex flex-col justify-center m-auto w-[80%] max-w-md rounded-lg  ">
                <h1 className="font-bold text-3xl text-black  mt-8 lg:mb-4 text-center">
                    Super Admin Login
                </h1>
                <div >
                    <div className='mb-5'>
                        <h1 className="font-medium text-sm mb-1  text-gray-500">Email </h1>
                        <input
                            className="outline-none border border-gray-300 text-sm    rounded-xl px-2 py-2 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email '
                        />
                    </div>
                    <div className='mb-10'>
                        <h1 className="font-medium text-sm mb-1  text-gray-500">Password</h1>
                        <input
                            className="outline-none border border-gray-300 text-sm    rounded-xl px-2 py-2 w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password '
                        />
                    </div>
                    <div className="text-center  pb-5 px-8">
                        <button onClick={handleLogin} className="bg-indigo-700 text-white px-4 py-2 mb-2 rounded w-full">
                            Login
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SuperAdminLogin