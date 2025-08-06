import { useEffect, useState } from "react";
import { Eye, Trash2, Pencil, Ban, UnlockIcon, Search, Download, Plus, Users } from "lucide-react";
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
          `User ${selectedUser.blocked ? "unblocked" : "blocked"
          } was successfully`
        );
      } else {
        toast.error(
          `User was not ${selectedUser.blocked ? "unblocked" : "blocked"
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
        <div className="min-h-screen p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="text-blue-600 h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">All System Users</h1>
                    <p className="text-gray-600">Manage and monitor all system users</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="text-blue-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-lg font-semibold text-gray-900">{users.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {users.filter(u => u.active && !u.blocked).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <Ban className="text-red-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Blocked</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {users.filter(u => u.blocked).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Admins</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {users.filter(u => u.role.toLowerCase().includes('admin')).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>

                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Users Table */}
            {filteredUsers.length === 0 ? (
              <NoUserFound />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedUsers.map((user, index) => (
                        <motion.tr
                          key={user._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {user.names.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.names}</div>
                                <div className="text-sm text-gray-500">ID: {user._id.slice(-6)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role.toLowerCase() === 'superadmin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                              }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.blocked
                              ? 'bg-red-100 text-red-800'
                              : user.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                              }`}>
                              {user.blocked ? "Blocked" : user.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                title="View User"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowModal(true);
                                }}
                                className="inline-flex items-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                title="Update User"
                                onClick={() => navigate(`/update-user/${user._id}`)}
                                className="inline-flex items-center p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                title={user.blocked ? "Unblock User" : "Block User"}
                                onClick={() =>
                                  confirmAndSetAction(
                                    user,
                                    user.blocked ? "unblock" : "block"
                                  )
                                }
                                className="inline-flex items-center p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                              >
                                {user.blocked ? <UnlockIcon className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                              </button>
                              <button
                                title="Delete User"
                                onClick={() => confirmAndSetAction(user, "delete")}
                                className="inline-flex items-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} results
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-gray-700">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View User Modal */}
            {showModal && selectedUser && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl shadow-xl w-full max-w-md"
                >
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {selectedUser.names.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
                        <p className="text-sm text-gray-500">{selectedUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedUser.names}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Role</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedUser.role}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Status</label>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${selectedUser.blocked
                          ? 'bg-red-100 text-red-800'
                          : selectedUser.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {selectedUser.blocked ? "Blocked" : selectedUser.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">2FA Enabled</label>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${selectedUser.twoFactorEnabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}>
                          {selectedUser.twoFactorEnabled ? "Yes" : "No"}
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</label>
                        <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Confirm Action Modal */}
            {showConfirmModal && selectedUser && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-xl shadow-xl w-full max-w-md"
                >
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Confirm {(confirmAction || '').charAt(0).toUpperCase() + (confirmAction || '').slice(1)} User
                    </h2>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to {confirmAction || ''} <strong className="text-gray-900">{selectedUser?.names}</strong>?
                    </p>
                    <p className="text-sm text-gray-500">
                      This action cannot be undone.
                    </p>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200 flex space-x-3">
                    <button
                      onClick={() => {
                        if (confirmAction === "delete") {
                          handleDelete();
                        } else if (confirmAction === "block" || confirmAction === "unblock") {
                          handleBlockToggle();
                        }
                      }}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      Yes, {confirmAction || ''}
                    </button>
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllUsers;
