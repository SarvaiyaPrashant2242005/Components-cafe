import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/loginPage";
import RegisterPage from "../src/pages/Ragister";
import OTPVerifyPage from "../src/pages/otpverify";
import Desktop from "../src/pages/desktop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OTPVerifyPage />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </Router>
  );
}

export default App;
