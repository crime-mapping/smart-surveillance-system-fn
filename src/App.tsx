//import { NotificationProvider } from "./contexts/notificationContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import RegistrationPage from "./pages/RegistrationPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Cameras from "./pages/Cameras/Cameras";
import HelpAndSupport from "./pages/HelpAndSupport";
import LandingPage from "./pages/LandingPage";
import CrimeHotspotMap from "./components/Map";
import LiveFeed from "./components/LiveFeed";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

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
          path: "/cameras",
          element: <Cameras />,
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
      element: <RegistrationPage />,
    },
    {
      path: "/2f-auth",
      element: <TwoFactorAuth />,
    },
    {
      path: "/help",
      element: <HelpAndSupport />,
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
