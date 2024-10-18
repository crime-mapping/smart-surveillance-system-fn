
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from "../pages/LandingPage";
import LoginPage from '../pages/LoginPage';
import TwoFactorAuth from '../pages/TwoFactorAuth';
import RegistrationPage from '../pages/RegistrationPage';
import UserDashboard from '../pages/UserDashboard/UserDashboard';

const Navigation = () => {
    return (
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={ <LoginPage/>} />
            <Route path="/register" element={ <RegistrationPage/>} />
            <Route path='/2f-auth' element={ <TwoFactorAuth/>} />
             <Route path='/user-dashboard' element={ <UserDashboard/>} />
         </Routes>
      </Router>
    )
}

export default Navigation;