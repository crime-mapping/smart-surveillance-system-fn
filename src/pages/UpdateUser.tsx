import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import DashboardLayout from "../Layout/DashboardLayout";
import { toast } from "react-toastify";
import { ArrowLeft, User, Lock, Mail, Phone, Shield } from "lucide-react";
import Spinner from "../components/Spinners";
import AllUsersSkeleton from "../skeletons/AllUsersSkeleton";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    _id:"",
    names: "",
    email: "",
    phone: "",
    role: "",
    twoFactorEnabled:false,
  });
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);
  const [updatingPassword, setUpdatingPassword] = useState<boolean>(false);

  const fetchUser = () => {
    setLoading(true);
    console.log('User ID: ', id);
    axios.get(`/users/single-user/${id}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

   const toggle2FA = async (userId:string) => {
    try {
      await axios.patch(`/users/user-toggle-2fa/${userId}`);
      setUser((prev: any) => ({
        ...prev,
        twoFactorEnabled: !prev.twoFactorEnabled,
      }));
      toast.success(
        `${user.names}'s Two-Factor Authentication ${user?.twoFactorEnabled ? "disabled" : "enabled"
        } successfully`
      );
    } catch (err) {
      toast.error("Failed to toggle user 2FA");
    }
  };

  const handleUpdate = async () => {
    setUpdatingUser(true);
    try {
      const response = await axios.put(`/users/update/${id}`, user);
      if (response.status == 200) {
        toast.success("User updated successfully");
      } else {
        toast.error("User update failed");
      }
      fetchUser();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Update failed");
    } finally {
      setUpdatingUser(false);
    }
  };

  const handlePasswordReset = async () => {
    setUpdatingPassword(true);
    try {
      await axios.put(`/users/change-user-password/${id}`, {newPassword });
      toast.success("User Password updated");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Password reset failed");
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <AllUsersSkeleton />
      ) : (
        <div className="min-h-screen p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => navigate("/users")}
                  className="inline-flex items-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Update User</h1>
                  <p className="text-gray-600">Modify user information and reset password</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Update User Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <User className="text-blue-600 h-4 w-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">User Information</h2>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        value={user.names}
                        onChange={(e) => setUser({ ...user, names: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white appearance-none"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                      >
                        <option value="">Select role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPERADMIN">Super Admin</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleUpdate}
                    disabled={updatingUser}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updatingUser ? (
                      <>
                        <Spinner />
                        <span className="ml-2">Updating User...</span>
                      </>
                    ) : (
                      "Update User"
                    )}
                  </button>
                </div>
              </div>

              {/* Reset Password */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <Lock className="text-red-600 h-4 w-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Reset Password</h2>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Enter a strong password for the user account
                    </p>
                  </div>

                  <button
                    onClick={handlePasswordReset}
                    disabled={updatingPassword || !newPassword.trim()}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updatingPassword ? (
                      <>
                        <Spinner />
                        <span className="ml-2">Updating Password...</span>
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </button>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Password Reset Warning
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            This action will immediately change the user's password. Make sure to communicate the new password securely to the user.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* Two-Factor Authentication */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.twoFactorEnabled
                            ? "Enhanced security is enabled"
                            : "Add an extra layer of security"}
                        </p>
                      </div>
                      <button
                        onClick={()=>toggle2FA(user._id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${user?.twoFactorEnabled ? "bg-blue-600" : "bg-gray-200"
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${user?.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">
                      {user?.twoFactorEnabled
                        ? "2FA is currently enabled on your account."
                        : "2FA is disabled. It's recommended to turn it on for added security."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UpdateUser;
