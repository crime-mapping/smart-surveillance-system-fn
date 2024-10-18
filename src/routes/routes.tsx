
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from "../pages/LandingPage";
import LoginPage from '../pages/LoginPage';
import TwoFactorAuth from '../pages/TwoFactorAuth';
import RegistrationPage from '../pages/RegistrationPage';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import Cameras from '../pages/Cameras/Cameras';
import HelpAndSupport from '../pages/HelpAndSupport';

const Navigation = () => {
    return (
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={ <LoginPage/>} />
            <Route path="/register" element={ <RegistrationPage/>} />
            <Route path='/2f-auth' element={ <TwoFactorAuth/>} />
            <Route path='/user-dashboard' element={ <UserDashboard/>} />
            <Route path='/cameras' element={<Cameras/> } /> 
             <Route path='/help' element={ <HelpAndSupport/>} /> 
         </Routes>
      </Router>
    )
}

export default Navigation;