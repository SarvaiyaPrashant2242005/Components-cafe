import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://components-cafe.onrender.com/user/login",
        {
          email,
          password,
        }
      );

      // ✅ Check token presence in response
if (response.data && response.data.token) {
  const token = response.data.token;

  if (rememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }

  Cookies.set("token", token, { expires: rememberMe ? 7 : 1 });

  // ❌ DO NOT STORE undefined user
  // Cookies.set("user", JSON.stringify(response.data.user)); ← Remove this

  navigate("/desktop");
} else {
        alert("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login error:", error);

      // ✅ Show specific message for unverified email
      if (error.response && error.response.status === 403) {
        alert("Email not verified. Please check your inbox.");
      } else {
        alert("Invalid credentials or user not found");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="remember-checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="custom-checkbox"></span>
            Remember Me
          </label>

          <button type="submit">Login</button>
        </form>

        <button className="sign" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;