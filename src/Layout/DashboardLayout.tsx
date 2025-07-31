import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import UserSidebar from "../components/UserSideBar";
import Header from "../pages/UserDashboard/Header";

type RootLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout = ({ children }: RootLayoutProps) => {
  return (
    <SidebarProvider>
      <UserSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
