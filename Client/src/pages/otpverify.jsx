import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OTPVerifyPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    try {
      const response = await axios.post("https://components-cafe.onrender.com/user/verify-otp", {
        email,
        otp
      });

      if (response.data.status) {
        alert("OTP verified successfully. Now you can login.");
        navigate("/");
      } else {
        alert("OTP verification failed");
      }
    } catch (error) {
      alert("Verification error");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Enter OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        /><br /><br />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default OTPVerifyPage;
