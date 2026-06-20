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

      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Overview Dashboard
      </h1>

      {/* filters */}
      <div className="flex flex-nowrap gap-3 mb-8 overflow-x-auto">
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

      {/* cards */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-pink-50">
              <ListOrdered className="h-7 w-7 text-pink-400" />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-semibold">Total Admin</p>
              <h2 className="text-3xl font-bold">{totalAdmin}</h2>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-green-50">
              <IndianRupee className="h-7 w-7 text-green-400" />
            </div>

            <div>
              <p className="text-sm text-slate-500 font-semibold">Total Revenue</p>
              <h2 className="text-3xl font-bold">{totalAmount}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminDashboard