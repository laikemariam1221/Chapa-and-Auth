import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "./confige.js";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const auth = getAuth(app); // Initialize auth with the app
  const navigate = useNavigate();
  // Create the reCAPTCHA verifier on component mount
  useEffect(() => {
    let recaptchaVerifier;
    try {
      recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        'size': 'normal',
        'callback': (response) => {
          // Handle successful reCAPTCHA verification (optional)
        },
        'expired-callback': () => {
          // Handle expired reCAPTCHA (optional)
        }
      });
    } catch (error) {
      console.error("Error creating reCAPTCHA verifier:", error);
      // Handle creation error gracefully (e.g., display an error message)
    } finally {
      window.recaptchaVerifier = recaptchaVerifier; // Assign to global variable
    }
  }, [auth]); // Only recreate on auth changes

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log(phoneNumber);
  };

  const handleOtpCodeChange = (e) => {
    setOtpCode(e.target.value);
  };
  const handleSubmitPhoneNumber = async () => {
    console.log("Phone Number Submitted:", phoneNumber);
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      
      const confirmation = await Promise.race([
        signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000)) // 10 seconds timeout
      ]);
      
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  

  const handleSubmitOtpCode = async () => {
    console.log("OTP Code Submitted:", otpCode);
    try {
      await confirmationResult.confirm(otpCode);
      setOtpCode('');
      navigate('/pay'); 
      // Handle successful OTP confirmation (e.g., redirect to user dashboard)
    } catch (error) {
      
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto">
        {!otpSent ? (
          <div id="recaptcha-container" className="mb-4"></div>
        ) : null}
        <h2 className="text-xl font-bold mb-4">Enter Phone Number</h2>
        <input
          type="text"
          className="w-full border rounded-md py-2 px-3 mb-4"
          placeholder="Phone Number +2519..."
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={handleSubmitPhoneNumber}
        >
          Submit Phone Number
        </button>
        <h2 className="text-xl font-bold mt-8 mb-4">Enter OTP Code</h2>
        <input
          type="text"
          className="w-full border rounded-md py-2 px-3 mb-4"
          placeholder="OTP Code"
          value={otpCode}
          onChange={handleOtpCodeChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleSubmitOtpCode}
        >
          Submit OTP Code
        </button>
      </div>
    </div>
  );
};

export default PhoneAuth;
