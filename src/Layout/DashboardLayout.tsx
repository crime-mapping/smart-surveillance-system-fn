import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserSidebar from "../components/UserSideBar";
import Header from "../pages/UserDashboard/Header";

type RootLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="w-[100vw] h-screen">
      <UserSidebar />
      <div className="w-[85%] ml-[15%] p-4">
        <Header />
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default DashboardLayout;
