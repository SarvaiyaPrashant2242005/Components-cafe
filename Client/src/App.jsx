import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Desktop from "./pages/desktop";
import Home from "./pages/Home";
// import Issue from "./pages/Issue";
// import Request from "./pages/Request";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import LoginPage from "./pages/loginPage";
import OtpVerify from "./pages/otpverify";
import Register from "./pages/Ragister";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected layout */}
        <Route path="/" element={<Desktop />}>
          <Route index element={<Home />} />
          {/* <Route path="issue" element={<Issue />} />
          <Route path="request" element={<Request />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
