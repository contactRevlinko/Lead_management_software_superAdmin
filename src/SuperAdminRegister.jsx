import React, { useState } from 'react'
import { validateEmail } from '../../frontend/src/utils/validation';
import { validatePassword } from '../../frontend/src/utils/validation';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;

const SuperAdminRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
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
        const superAdminToken = localStorage.getItem("superAdminToken");
        if (!superAdminToken) {
            console.log("Please login as main super admin first")
            toast.error("Please login as main super admin first");
            navigate("/login-sa");
            return;
        }
        try {
          
            const res = await fetch(`${BASE_URL}/super-admin/create-sa`, {
                method: "POST",
                headers: { "Content-type": "application/json" ,
                    Authorization: `Bearer ${superAdminToken}`,

                },
                body: JSON.stringify({
                    name, phone, email, password
                })
            })

            const result = await res.json();
            console.log(result);
            if (res.ok) {
                console.log("created superamin by mainSuperAdmin")
                navigate("/login-sa")
            } else {
                navigate("/register-sa")
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="bg-slate-50 px-10 shadow-lg   flex flex-col justify-center m-auto w-[80%] max-w-md rounded-lg  ">
                <h1 className="font-bold text-3xl text-black  mt-8 lg:mb-4 text-center">
                    Super Admin register
                </h1>
                <div >
                    <div className='mb-5'>
                        <h1 className="font-medium text-sm mb-1  text-gray-500">Name </h1>
                        <input
                            className="outline-none border border-gray-300 text-sm    rounded-xl px-2 py-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your name '
                        />
                    </div>
                    <div className='mb-5'>
                        <h1 className="font-medium text-sm mb-1  text-gray-500">Phone </h1>
                        <input
                            className="outline-none border border-gray-300 text-sm    rounded-xl px-2 py-2 w-full"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='Enter your name '
                        />
                    </div>
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
                        <button onClick={handleRegister} className="bg-indigo-700 text-white px-4 py-2 mb-2 rounded w-full">
                            Create SA
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SuperAdminRegister