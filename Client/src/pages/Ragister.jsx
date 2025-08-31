import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Ragister.css"; // Import the CSS

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      const response = await axios.post("https://components-cafe.onrender.com/user/register", {
        name,
        email,
        password
      });

      if (response.data.status) {
        alert("OTP sent to your email");
        navigate("/verify-otp");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert("Something went wrong during registration");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>
      </form>

      <button className="login-btn" onClick={() => navigate("/login")}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default RegisterPage;
