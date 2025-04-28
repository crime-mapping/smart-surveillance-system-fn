import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import DashboardLayout from "../Layout/DashboardLayout";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import Spinner from "../components/Spinners";
import AllUsersSkeleton from "../skeletons/AllUsersSkeleton";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    names: "",
    email: "",
    phone: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);
  const [updatingPassword, setUpdatingPassword] = useState<boolean>(false);

  const fetchUser = () => {
    setLoading(true);
    axios.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchUser();
  }, [id]);

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
      await axios.put(`/users/${id}/password`, { password: newPassword });
      toast.success("Password updated");
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
        <>
          <div className="flex mt-24 justify-between items-center my-4">
            <span
              onClick={() => {
                navigate("/users");
              }}
              className="cursor-pointer rounded-md"
            >
              <FiArrowLeft className="w-16 h-10" />
            </span>
          </div>
          <div className="max-w-xl mx-auto mt-4 bg-white px-6 shadow rounded-md">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>

            <div className="space-y-4">
              <input
                value={user.names}
                onChange={(e) => setUser({ ...user, names: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Full Name"
              />
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Email"
              />
              <input
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Phone"
              />
              <select
                name="location"
                className="border rounded-md w-full p-2"
                required
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option selected={user.role == "ADMIN"} value="ADMIN">
                  ADMIN
                </option>
                <option selected={user.role == "SUPERADMIN"} value="SUPERADMIN">
                  SUPERADMIN
                </option>
              </select>

              <button
                type="submit"
                onClick={handleUpdate}
                disabled={updatingUser}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
              >
                {updatingUser ? "Updating User..." : "Update User"}
              </button>
              {updatingUser && <Spinner />}
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">
                Reset User Password
              </h3>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-md"
              />

              <button
                type="submit"
                onClick={handlePasswordReset}
                disabled={updatingPassword}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
              >
                {updatingPassword ? "Updating Password..." : "Update Password"}
              </button>
              {updatingPassword && <Spinner />}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default UpdateUser;
