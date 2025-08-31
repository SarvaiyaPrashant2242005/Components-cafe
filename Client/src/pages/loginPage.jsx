import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if OTP not verified
//   useEffect(() => {
//     const verified = localStorage.getItem("otp_verified");
//     if (verified !== "true") {
//       alert("Please complete OTP verification first");
//       navigate("/register");
//     }
//   }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://components-cafe.onrender.com/user/login", {
        email,
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/desktop");
      } else {
        alert("User not found");
      }
    } catch {
      alert("Invalid credentials or user not found");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
