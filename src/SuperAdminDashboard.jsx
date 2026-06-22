import React, { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;

import { IndianRupee, ListOrdered } from 'lucide-react';
import SACustomCalendar from './SACustomCalender';

const SuperAdminDashboard = () => {

  const getCurrentMonthStart = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .split("T")[0];
  };

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [totalAdmin, setTotalAdmin] = useState(0);
  const [startDate, setStartDate] = useState(getCurrentMonthStart());
  const [endDate, setEndDate] = useState(getToday());
  const [totalAmount, setTotalAmount] = useState(0);


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
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Overview Dashboard
        </h1>
      </div>

      {/* filters */}
      <div className="flex w-full flex-nowrap gap-3 mb-8 overflow-visible ">
      <div className='w-1/2'>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">Start Date</p>
          <SACustomCalendar
            value={startDate}
            onChange={(val) => setStartDate(val)}
            placeholder="Start Date"
          />
      </div>
  
       <div className='w-1/2'>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">End Date</p>

          <SACustomCalendar
            value={endDate}
            onChange={(val) => setEndDate(val)}
            placeholder="End Date"
          />
       </div>
      </div>

      {/* cards */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 border border-pink-100">
              <ListOrdered className="h-5 w-5 text-pink-600" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">TOTAL ADMIN</p>
              <h2 className="mt-1 text-3xl font-bold text-slate-800">{totalAdmin}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 border border-green-100">
              <IndianRupee className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">TOTAL REVENUE</p>
              <h2 className="mt-1 text-3xl font-bold text-slate-800">{totalAmount}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminDashboard