import React, { useState, useRef, useEffect } from 'react';
import WelcomePane from '../components/welcomePane';
import { useLoginTwoFaMutation } from '../redux/slices/authSlice/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setCredentials } from '../redux/slices/authSlice/authSlice';
import Spinner from '../components/Spinners';

const TwoFactorAuth: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [login2FA, { isLoading }] = useLoginTwoFaMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // const navigateBasedOnRole = (role: string) => {
  //   switch (role) {
  //     case "Admin":
  //       navigate("/adminDashboard");
  //       break;
  //     case "Officer":
  //       navigate("/userDashboard");
  //       break;
  //     default:
  //       navigate("/");
  //       break;
  //   }
  // };
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      const response = await login2FA({ tempToken: enteredCode,code:enteredCode }).unwrap();
      dispatch(setCredentials({ ...response }));
      console.log("Response: ", response);
      toast.success("Two-factor authentication successful!");
      navigate('/user-dashboard'); 
    } catch (error) {
      console.log("Response: ", error);
      toast.error("Invalid 2FA code.");
    }
  };

  return (
    <div className="w-[100vw] gap-0 flex">
      <WelcomePane />
      <div className="w-1/2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Two Factor Authentication</h2>
          <p className="text-left mb-6">
            Please enter the 6-digit code we just sent to your email.
          </p>
          <div className="flex justify-between mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="number"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
