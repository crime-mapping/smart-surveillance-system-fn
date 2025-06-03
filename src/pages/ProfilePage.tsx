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

  return (
    <DashboardLayout>
      {loading ? (
        <ProfilePageSkeleton />
      ) : (
        <div className="min-h-screen mt-24 pt-4 md:flex-row">
          {/* Left - Profile Card */}
          <div className="flex flex-row gap-4 my-2 items-center">
            <div className="bg-white  flex flex-col items-center rounded-lg min-h-80 max-h-96 shadow-md p-8 w-1/2 text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="text-gray-600 h-24 w-24 text-5xl" />
              </div>

              <h3 className="text-black font-bold mt-4 text-lg">{username}</h3>
              <div className="text-gray-600 mt-4 text-xs mt-2">
                <p className="bg-green-500 text-white mb-2 py-2 rounded-2xl">
                  {" "}
                  Joined on {formatDate(user?.createdAt)}
                </p>
                <p className="bg-yellow-500 text-white p-2 rounded-2xl">
                  {" "}
                  Updated on {formatDate(user?.updatedAt)}
                </p>
              </div>
            </div>

            {/* Update Profile Section */}
            <div className="bg-white w-full rounded-lg pb-2 shadow-md overflow-hidden">
              <div className="bg-primaryBackground  flex justify-between text-white px-4 py-2 font-semibold text-md flex items-center gap-2">
                <span className="flex items-center gap-2">
                  <FaUser /> Profile
                </span>
                <Pencil
                  onClick={() => {
                    setEditingMode(true);
                  }}
                  className="cursor-pointer"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Names
                  </label>
                  <input
                    name="names"
                    type="text"
                    className="border w-full p-2 rounded"
                    value={user?.names}
                    disabled={!editingMode}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="border w-full p-2 rounded"
                    value={user?.email}
                    disabled={!editingMode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    name="phone"
                    type="text"
                    className="border w-full p-2 rounded"
                    value={user?.phone}
                    disabled={!editingMode}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  disabled={!editingMode}
                  onClick={handleProfileUpdate}
                  className={`w-full mt-4 ${
                    editingMode || updatingUser
                      ? "bg-primaryBackground"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white p-2 rounded`}
                >
                  {updatingUser ? "Updating Profile..." : "Update Profile"}
                </button>
                {updatingUser && <Spinner />}
              </div>
            </div>
          </div>

          {/* Update Password Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primaryBackground  text-white px-4 py-2 font-semibold text-md flex items-center gap-2">
              <FaUser /> Change Password
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="border w-full p-2 rounded"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="border w-full p-2 rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="border w-full p-2 rounded"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handlePasswordUpdate}
                className="w-full mt-4 bg-primaryBackground text-white p-2 rounded"
              >
                {updatingPassword ? "Updating Password..." : "Update Password"}
              </button>
              {updatingPassword && <Spinner />}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
