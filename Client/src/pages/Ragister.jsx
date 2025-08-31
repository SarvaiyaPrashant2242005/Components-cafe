import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Save email and password temporarily
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      // Call your register API
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
    <div style={{ padding: "2rem" }}>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
