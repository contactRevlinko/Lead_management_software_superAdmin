import React, { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;
import { HandCoins, Icon, Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";
import SAdeletepopup from "./SAdeletepopup";
import SADropdown from "./SADropdown";
import SuperAdminAddAdmin from "./SuperAdminAddAdmin";

const SuperAdminMangement = () => {
  const [admins, setAdmins] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [packageFilter, setPackageFilter] = useState("All");
  const [addAdminModal, setAddAdminModal] = useState(false)

  const fetchAdmin = async () => {
    const superAdminToken = localStorage.getItem("superAdminToken");

    try {
      const res = await fetch(`${BASE_URL}/super-admin/admins`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${superAdminToken}`,
        },
      });
      const adminData = await res.json();
      console.log(adminData, "adminData");
      setAdmins(adminData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (adminId) => {
    console.log("admin ID", adminId);
    const superAdminToken = localStorage.getItem("superAdminToken");

    try {
      const res = await fetch(`${BASE_URL}/super-admin/admin/${adminId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${superAdminToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      setAdmins((prev) => prev.filter((admin) => admin._id !== adminId));
      toast.success("Admin deleted successfully");
      setDeletePopup(false);
      setSelectedId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAdmins = admins?.filter((admin) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      admin.name?.toLowerCase().includes(searchText) ||
      admin.email?.toLowerCase().includes(searchText) ||
      admin.phone?.includes(search);

    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && admin.isActive) ||
      (statusFilter === "Inactive" && !admin.isActive);

    const matchPackage =
      packageFilter === "All" ||
      packageFilter === "All Package" ||
      (packageFilter === "ActivePackage" && admin.subscriptionStatus === "active") ||
      (packageFilter === "InactivePackage" && admin.subscriptionStatus === "inactive") ||
      (packageFilter === "ExpiredPackage" && admin.subscriptionStatus === "expired");

    return matchSearch && matchStatus && matchPackage;
  });

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const superAdminToken = localStorage.getItem("superAdminToken");

      const res = await fetch(`${BASE_URL}/super-admin/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${superAdminToken}`,
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          !currentStatus
            ? "Admin active successfully"
            : "Admin inactive successfully",
        );

        fetchAdmin();
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchAdmin();
  }, []);
  console.log(admins);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Management</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage all registered admins from one place.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-4">
        <div className="flex items-center gap-4 w-full p-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50"
          >
            <Users size={22} className="text-indigo-500" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              admins
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              {admins?.length || 0}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full p-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50"
          >
            <HandCoins size={22} className="text-purple-500" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total amount
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              0
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-3xl p-5 flex flex-col md:flex-row md:items-end gap-4 shadow-sm overflow-visible">  
        
        {/* Search Field */}
        <div className="w-full md:flex-1">
          <p className="text-gray-500 text-xs md:text-sm font-medium mb-1.5">Search Admins</p>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 border border-gray-300 bg-white rounded-xl px-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full sm:w-1/2 md:w-auto md:min-w-[160px]">
          <p className="text-gray-500 text-xs md:text-sm font-medium mb-1.5">Status</p>
          <SADropdown
            value={statusFilter}
            options={["All", "Active", "Inactive"]}
            onChange={setStatusFilter}
          />
        </div>

        {/* Packages Dropdown */}
        <div className="w-full sm:w-1/2 md:w-auto md:min-w-[180px]">
          <p className="text-gray-500 text-xs md:text-sm font-medium mb-1.5">Packages</p>
          <SADropdown
            value={packageFilter}
            onChange={setPackageFilter}
            options={[
              "All Package",
              "ActivePackage",
              "InactivePackage",
              "ExpiredPackage",
            ]}
          />
        </div>
     
        {/* Add Admin Button */}
        <div className="w-full md:w-auto shrink-0">
          <button
            onClick={() => setAddAdminModal(true)}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-semibold transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-100/30"
          >
            + Add Admin
          </button>
        </div>

      </div>


      {/* mobile */}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-20 lg:hidden mt-10">
          {filteredAdmins?.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl border border-slate-200/80 p-10 text-center shadow-sm">
              <Users className="mx-auto mb-3 w-12 h-12 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700">
                No Leads Found
              </h3>
              <p className="text-gray-500 mt-2">
                Add your first lead to get started.
              </p>
            </div>
          ) : (
            filteredAdmins?.map((admin) => (
              <div
                key={admin._id}
                className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 hover:shadow-md transition-all duration-300"
              >
                {/* Header */}
                <div className="mb-4">
                  <h1 className="text-lg font-bold text-gray-900 capitalize">
                    {admin.name}
                  </h1>

                </div>

                {/* Info */}
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                    <p className="text-gray-500">Mobile</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.phone}
                    </p>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                    <p className="text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.email}
                    </p>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                    <p className="text-gray-500">Business Type</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.businessType}
                    </p>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                    <p className="text-gray-500">Timestams</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.createdAt
                        ? new Date(admin.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "-"}
                    </p>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                    <p className="text-gray-500">Status</p>
                    <div className="text-gray-800 font-medium truncate">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={admin.isActive}
                          onChange={() =>
                            handleToggleStatus(admin._id, admin.isActive)
                          }
                          className="sr-only peer"
                        />

                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>

                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                    <p className="text-gray-500">Payment Verified</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.paymentVerified ? "Yes" : "No"}
                    </p>
                  </div>  <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                    <p className="text-gray-500">Package Assigned</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.packageAssigned || "-"}
                    </p>
                  </div>  <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                    <p className="text-gray-500">Package Expire Date</p>
                    <p className="text-gray-800 font-medium truncate">
                      {admin.packageExpiryDate
                        ? new Date(admin.packageExpiryDate).toLocaleDateString(
                          "en-GB",
                        )
                        : "-"}
                    </p>
                  </div>


                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedId(admin._id);
                      setDeletePopup(true);
                    }}
                    className="
          h-10 rounded-xl text-sm font-semibold
          text-red-600 bg-red-50 border border-red-200
          hover:bg-red-100 active:scale-[0.98]
          transition
        "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 mt-10 overflow-x-auto hidden lg:block">
        <table className="min-w-[1400px] w-full">
          <thead className="bg-indigo-50/60 border-b border-slate-200/80">
            <tr className="text-left">
              {[
                "SR NO.",
                "NAME",
                "PHONE",
                "EMAIL",
                "BUSINESS TYPE",
                "TIMESTAMP",
                "STATUS",
                "PAYMENT VERIFIED",
                "PACKAGE ASSIGNED",
                "PACKAGE EXPIRY DATE",
                "ACTION",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredAdmins?.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-16 text-gray-500">
                  <Users className="mx-auto mb-3 w-12 h-12 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-700">
                    No admin Found
                  </h3>
                  <p className="mt-2">crete super admin</p>
                </td>
              </tr>
            ) : (
              filteredAdmins?.map((admin, i) => (
                <tr
                  key={admin._id}
                  className="border-b border-slate-100 text-left hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{i + 1}</td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{admin.name}</td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{admin.phone}</td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{admin.email}</td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                      {admin.businessType || "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "-"}
                  </td>

                  <td className="px-6 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={admin.isActive}
                        onChange={() =>
                          handleToggleStatus(admin._id, admin.isActive)
                        }
                        className="sr-only peer"
                      />

                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>

                      <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-5"></div>
                    </label>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {admin.paymentVerified ? "Yes" : "No"}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{admin.packageAssigned || "-"}</td>

                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {admin.packageExpiryDate
                      ? new Date(admin.packageExpiryDate).toLocaleDateString(
                        "en-GB",
                      )
                      : "-"}
                  </td>

                  <td className="px-6 py-3">
                    <button
                      onClick={() => {
                        setSelectedId(admin._id);
                        setDeletePopup(true);
                      }}
                      className="h-10 px-4 rounded-xl text-sm font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 active:scale-[0.98] transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {deletePopup && (
        <SAdeletepopup
          onClose={() => setDeletePopup(false)}
          onDelete={() => handleDelete(selectedId)}
        />
      )}

      {addAdminModal && (
        <SuperAdminAddAdmin
          onClose={() => setAddAdminModal(false)}
          onSuccess={(newAdmin) => {
            setAdmins((prev) => [newAdmin, ...prev]);
          }}
        />
      )}

    </div>
  );
};

export default SuperAdminMangement;
