import { useEffect, useState } from "react";
import { Eye, Trash2, Pencil, Ban, UnlockIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../Layout/DashboardLayout";
import axios from "../config/axios";
import NoUserFound from "../components/NoUserFound";
import { formatDate } from "../utils/formatDate";
import AllUsersSkeleton from "../skeletons/AllUsersSkeleton";

export interface IUser {
  _id: string;
  names: string;
  phone: string;
  email: string;
  role: string;
  active: boolean;
  blocked: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const USERS_PER_PAGE = 6;

const AllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "block" | "unblock" | null
  >(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users", { withCredentials: true });
      setUsers(response.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to retrieve users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.put(
        `/users/desactivate/${selectedUser._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        toast.success("User was deleted successfully");
      } else {
        toast.error("User was not deleted successfully. Try again later.");
      }
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to delete user");
    } finally {
      setShowConfirmModal(false);
      setSelectedUser(null);
    }
  };

  const handleBlockToggle = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.put(
        `/users/access/${selectedUser._id}`,
        {
          action: selectedUser.blocked ? "unblock" : "block",
        },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success(
          `User ${
            selectedUser.blocked ? "unblocked" : "blocked"
          } was successfully`
        );
      } else {
        toast.error(
          `User was not ${
            selectedUser.blocked ? "unblocked" : "blocked"
          }  successful. Try again later`
        );
      }

      fetchUsers();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          `Failed to ${selectedUser.blocked ? "unblock" : "block"} user`
      );
    } finally {
      setShowConfirmModal(false);
      setSelectedUser(null);
    }
  };

  const confirmAndSetAction = (
    user: IUser,
    action: "delete" | "block" | "unblock"
  ) => {
    setSelectedUser(user);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.names.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesRole =
      roleFilter === "all" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.active && !user.blocked) ||
      (statusFilter === "inactive" && !user.active) ||
      (statusFilter === "blocked" && user.blocked);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Role", "Status"];
    const rows = filteredUsers.map((user) => [
      user.names,
      user.phone,
      user.email,
      user.role,
      user.blocked ? "Blocked" : user.active ? "Active" : "Inactive",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "system_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      {loading ? (
        <AllUsersSkeleton />
      ) : (
        <>
          <div className="flex justify-between items-center my-4">
            <h1 className="text-xl font-semibold">All System Users</h1>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              + Add New User
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wra gap-4 items-center justify-left my-4">
            <input
              type="text"
              placeholder="Search users by name, phone, or email"
              className="border px-3 py-2 rounded w-full md:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="border px-3 py-2 rounded"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              {/* Add more roles as needed */}
            </select>

            <select
              className="border px-3 py-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>

            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Export CSV
            </button>
          </div>

          {filteredUsers.length === 0 ? (
            <NoUserFound />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-sm font-semibold text-gray-600">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-6 py-4">{user.names}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                          {user.blocked
                            ? "Blocked"
                            : user.active
                            ? "Active"
                            : "Inactive"}
                        </td>
                        <td className="px-6 py-4 text-center space-x-3">
                          <button
                            title="View User"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Eye />
                          </button>
                          <button
                            title="Update User"
                            onClick={() => navigate(`/update-user/${user._id}`)}
                            className="text-yellow-500 hover:text-yellow-600"
                          >
                            <Pencil />
                          </button>
                          <button
                            title={user.blocked ? "Unblock User" : "Block User"}
                            onClick={() =>
                              confirmAndSetAction(
                                user,
                                user.blocked ? "unblock" : "block"
                              )
                            }
                            className="text-purple-500 hover:text-purple-600"
                          >
                            {user.blocked ? <UnlockIcon /> : <Ban />}
                          </button>
                          <button
                            title="Delete User"
                            onClick={() => confirmAndSetAction(user, "delete")}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center my-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* View User Modal */}
          {showModal && selectedUser && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
              >
                <h2 className="text-xl font-bold mb-4 text-center">
                  User Details
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {selectedUser.names}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedUser.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedUser.role}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedUser.blocked
                      ? "Blocked"
                      : selectedUser.active
                      ? "Active"
                      : "Inactive"}
                  </p>
                  <p>
                    <strong>Two Factor Enabled:</strong>{" "}
                    {selectedUser.twoFactorEnabled ? "True" : "False"}
                  </p>
                  <p>
                    <strong>Joined on:</strong>{" "}
                    {formatDate(selectedUser.createdAt)}
                  </p>
                  <p>
                    <strong>Last Update on:</strong>{" "}
                    {formatDate(selectedUser.updatedAt)}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 w-full text-center bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}

          {/* Confirm Action Modal */}
          {showConfirmModal && selectedUser && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-lg p-6 shadow-md w-full max-w-sm text-center"
              >
                <h2 className="text-lg font-semibold mb-4">
                  Confirm{" "}
                  {(confirmAction ?? "").charAt(0).toUpperCase() +
                    (confirmAction ?? "").slice(1)}{" "}
                  User
                </h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to {confirmAction}{" "}
                  <strong>{selectedUser.names}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      confirmAction === "delete"
                        ? handleDelete()
                        : handleBlockToggle();
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Yes, {confirmAction}
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default AllUsers;
