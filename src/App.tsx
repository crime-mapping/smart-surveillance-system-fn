import { Provider } from 'react-redux';
import { NotificationProvider } from './contexts/notificationContext';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import store from "./redux/store";
import LoginPage from './pages/LoginPage';
import TwoFactorAuth from './pages/TwoFactorAuth';
import RegistrationPage from './pages/RegistrationPage';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Cameras from './pages/Cameras/Cameras';
import HelpAndSupport from './pages/HelpAndSupport';
import LandingPage from './pages/LandingPage';
import CrimeHotspotMap from './components/Map';
import LiveFeed from './components/LiveFeed';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={ <LoginPage/>} />
        <Route path="/register" element={ <RegistrationPage/>} />
        <Route path='/2f-auth' element={ <TwoFactorAuth/>} />
        <Route path='/user-dashboard' element={ <UserDashboard/>} />
        <Route path='/cameras' element={<Cameras/> } /> 
        <Route path='/help' element={<HelpAndSupport />} /> 
        <Route path='/map' element={<CrimeHotspotMap />} /> 
        <Route path="/live-feed/:cameraId" element={<LiveFeed />} />
      </>
    )
  );

  return (
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  );
};

export default App;