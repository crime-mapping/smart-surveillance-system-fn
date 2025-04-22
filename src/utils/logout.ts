import axios from "../config/axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      sessionStorage.clear();
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("Logout failed, try again.");
    }
  };

  return handleLogout;
};

export default useLogout;
