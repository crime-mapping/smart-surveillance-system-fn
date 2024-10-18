import React, { useState, useRef, useEffect } from 'react';
import WelcomePane from '../components/welcomePane';

const TwoFactorAuth: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

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

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='w-[100vw] gap-0 flex'>
    <WelcomePane/>
    <div className="w-1/2 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg ]">
        <div className="flex items-center gap-4 justify-left mb-12">
          <div className="bg-gray-800 text-white rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
           <h2 className="text-2xl font-bold mb-4 text-center">Two Factor Authentication</h2>
        </div>
        <p className="text-left mb-6">
          Please Enter 6 Digits We Just Sent To Your Email.
        </p>
        <p className="text-center text-sm text-gray-500 mb-6">
          This helps us keep your account secure by verifying that it's really you.
        </p>
        <div className="flex justify-between mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Continue
        </button>
      </div>
    </div>
    </div>
  );
};

export default TwoFactorAuth;