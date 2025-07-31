import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import DashboardLayout from "../Layout/DashboardLayout";
import { Pencil } from "lucide-react";
import Spinner from "../components/Spinners";
import ProfilePageSkeleton from "../skeletons/ProfilePageSkeleton";

interface IUser {
  _id: string;
  names: string;
  email: string;
  phone: string;
  twoFactorEnabled: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);
  const [updatingPassword, setUpdatingPassword] = useState<boolean>(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/users/profile", { withCredentials: true });
      setUser(res.data);
      setUsername(res.data.names);
    } catch (err: any) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user?.names || !user?.email) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(user?.email)) {
      toast.error("Invalid email format.");
      return;
    }
    setUpdatingUser(true);
    try {
      const response = await axios.put(
        `/users/update/${user?._id}`,
        { names: user?.names, email: user?.email, phone: user?.phone },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error("User was not updated!");
      }
      fetchUserProfile();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to update profile.");
    } finally {
      setUpdatingUser(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New Passwords Mismatches !");
      return;
    }
    setUpdatingPassword(true);
    try {
      const response = await axios.put(
        `/users/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success("Password updated successfully.");
      } else {
        toast.error("Password was not changed !");
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to change password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const toggle2FA = async () => {
    try {
      await axios.patch("/users/toggle-2fa");
      setUser((prev: any) => ({
        ...prev,
        twoFactorEnabled: !prev.twoFactorEnabled,
      }));
      toast.success(
        `Two-Factor Authentication ${user?.twoFactorEnabled ? "disabled" : "enabled"
        } successfully`
      );
    } catch (err) {
      toast.error("Failed to toggle 2FA");
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <ProfilePageSkeleton />
      ) : (
        <div className="min-h-screen p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">Manage your account information and security settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card - Left Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <FaUser className="text-white h-10 w-10" />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {username}
                    </h2>

                    <div className="space-y-2 mb-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Joined {formatDate(user?.createdAt)}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Updated {formatDate(user?.updatedAt)}
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
                        onClick={toggle2FA}
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

              {/* Main Content - Right Side */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile Information Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FaUser className="text-blue-600 h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                      </div>
                      <button
                        onClick={() => setEditingMode(true)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          name="names"
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${editingMode
                              ? "border-gray-300 bg-white"
                              : "border-gray-200 bg-gray-50 text-gray-500"
                            }`}
                          value={user?.names}
                          disabled={!editingMode}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${editingMode
                              ? "border-gray-300 bg-white"
                              : "border-gray-200 bg-gray-50 text-gray-500"
                            }`}
                          value={user?.email}
                          disabled={!editingMode}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${editingMode
                              ? "border-gray-300 bg-white"
                              : "border-gray-200 bg-gray-50 text-gray-500"
                            }`}
                          value={user?.phone}
                          disabled={!editingMode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {editingMode && (
                      <div className="mt-6 flex items-center space-x-3">
                        <button
                          onClick={handleProfileUpdate}
                          disabled={updatingUser}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {updatingUser ? (
                            <>
                              <Spinner />
                              <span className="ml-2">Updating...</span>
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                        <button
                          onClick={() => setEditingMode(false)}
                          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Password Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <svg className="text-red-600 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handlePasswordUpdate}
                        disabled={updatingPassword}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    </div>
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

export default ProfilePage;
