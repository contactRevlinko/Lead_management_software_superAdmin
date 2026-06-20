import React, { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import squreCard from '../../frontend/src/componenets/SqureCard';
import { IndianRupee, ListOrdered } from 'lucide-react';
import SACustomCalendar from './SACustomCalender';

const SuperAdminDashboard = () => {


  const [totalAdmin, setTotalAdmin] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount , setTotalAmount] = useState(0)
  const fetchAdmin = async () => {
    const token = localStorage.getItem("superAdminToken");

    let url = `${BASE_URL}/super-admin/admins`;

    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setTotalAdmin(data.data.length);
  };

  const fetchAmount = async () => {
    const token = localStorage.getItem("superAdminToken");

    const res = await fetch(`${BASE_URL}/super-admin/total-amount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    setTotalAmount(data.totalAmount);
  }; 

  
  useEffect(() => {
    fetchAmount();
  }, []);

  useEffect(() => {
    fetchAdmin();
  }, [startDate, endDate]);

  return (
    <div className='h-screen'>

      <h1 className="text-3xl font-bold text-slate-900 mb-10">
        Overview Dashboard
      </h1>

      <div className="flex gap-3 mb-8 ">
        <SACustomCalendar
          value={startDate}
          onChange={(val) => setStartDate(val)}
          placeholder="Start Date"
        />

        <SACustomCalendar
          value={endDate}
          onChange={(val) => setEndDate(val)}
          placeholder="End Date"
        />
      </div>
<div className='w-full flex gap-5  '>

        <div className=" w-1/2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-5">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 `}
            >
              <ListOrdered className={`h-8 w-8 text-pink-400`} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Total Admin</p>
              <h2 className="mt-2 text-4xl font-bold text-slate-900">{totalAdmin}</h2>
            </div>
          </div>



        </div>

        <div className= " w-1/2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ">
          <div className="flex items-start gap-5">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 `}
            >
              <IndianRupee className={`h-8 w-8 text-green-400`} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Total revenew</p>
              <h2 className="mt-2 text-4xl font-bold text-slate-900">{totalAmount}</h2>
            </div>
          </div>



        </div>
</div>


    </div>
  )
}

export default SuperAdminDashboard