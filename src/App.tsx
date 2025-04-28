//import { NotificationProvider } from "./contexts/notificationContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Cameras from "./pages/Cameras/Cameras";
import HelpAndSupport from "./pages/HelpAndSupport";
import LandingPage from "./pages/LandingPage";
import CrimeHotspotMap from "./components/Map";
import LiveFeed from "./components/LiveFeed";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import CrimeDetails from "./components/CrimeDetails";
import RegisterUserPage from "./pages/RegisterUser";
import AllUsers from "./pages/AllUsers";
import UpdateUser from "./pages/UpdateUser";
import ProfilePage from "./pages/ProfilePage";
import CrimeReports from "./pages/CrimeReports";

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/user-dashboard",
          element: <UserDashboard />,
        },
        {
          path: "/users",
          element: <AllUsers />,
        },
        {
          path: "/update-user/:id",
          element: <UpdateUser />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/cameras",
          element: <Cameras />,
        },
        {
          path: "/reports",
          element: <CrimeReports />,
        },
        {
          path: "/crime/:id",
          element: <CrimeDetails />,
        },
        {
          path: "/map",
          element: <CrimeHotspotMap />,
        },
        {
          path: "/live-feed/:cameraId",
          element: <LiveFeed />,
        },
      ],
    },
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterUserPage />,
    },

    {
      path: "/2f-auth",
      element: <TwoFactorAuth />,
    },
    {
      path: "/help",
      element: <HelpAndSupport />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    // <NotificationProvider>
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
    //</NotificationProvider>
  );
}

export default App;
