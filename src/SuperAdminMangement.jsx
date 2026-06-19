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
      packageFilter === "All" || admin.subscriptionStatus === packageFilter;

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
    <div className="p-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Management</h1>
        <p className="text-gray-500 mt-1">
          Manage all registered admins from one place.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-4">
        <div className="flex md:gap-4 gap-2 md:m-1 w-full p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div
            className={`m-2 w-11 h-11 rounded-xl flex items-center justify-center bg-indigo-50 `}
          >
            <Users size={22} className="text-indigo-500" />
          </div>

          <div>
            <p className="text-gray-500 text-xs md:text-sm font-medium">
              admins
            </p>
            <span className="text-2xl font-semibold text-gray-900 ">
              {admins?.length || 0}
            </span>
          </div>
        </div>

        <div className="flex md:gap-4 gap-2 md:m-1 w-full p-3 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <div
            className={`m-2 w-11 h-11 rounded-xl flex items-center justify-center bg-purple-50 `}
          >
            <HandCoins size={22} className="text-purple-500" />
          </div>

          <div>
            <p className="text-gray-500 text-xs md:text-sm font-medium">
              Total amount
            </p>
            <span className="text-2xl font-semibold text-gray-900">
              {/* {admins.length || 0} */} 0
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col lg:justify-between md:flex-row gap-4 ">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      <div className="flex gap-5 justify-between  ">
          <SADropdown
            value={statusFilter}
            options={["All", "Active", "Inactive"]}
            onChange={setStatusFilter}
          />

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
        <div>
          <button
            onClick={() => setAddAdminModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            + Add Admin
          </button>
        </div>
      </div>


      {/* mobile */}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-20 lg:hidden mt-10">
          {filteredAdmins?.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-gray-200 p-10 text-center">
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
                className="
      bg-white rounded-2xl border border-gray-100
      shadow-[0_12px_35px_rgba(15,23,42,0.10)]
      p-4
    "
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

      {/* desktop */}

      <div className="bg-white rounded-2xl border border-gray-200 mt-10 overflow-x-auto hidden lg:block">
        <table className="min-w-[1400px] w-full">
          <thead className="bg-indigo-50 border-b border-gray-200">
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
                  className="p-6 text-sm font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredAdmins?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-16 text-gray-500">
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
                  className="text-left text-gray-700 hover:bg-gray-50"
                >
                  <td className="px-6 py-5">{i + 1}</td>

                  <td className="px-6 py-5">{admin.name}</td>

                  <td className="px-6 py-5">{admin.phone}</td>

                  <td className="px-6 py-5">{admin.email}</td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
                      {admin.businessType || "-"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "-"}
                  </td>

                  <td className="px-6 py-5">
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

                  <td className="px-6 py-5">
                    {admin.paymentVerified ? "Yes" : "No"}
                  </td>

                  <td className="px-6 py-5">{admin.packageAssigned || "-"}</td>

                  <td className="px-6 py-5">
                    {admin.packageExpiryDate
                      ? new Date(admin.packageExpiryDate).toLocaleDateString(
                        "en-GB",
                      )
                      : "-"}
                  </td>

                  <td className="px-2 py-3">
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
