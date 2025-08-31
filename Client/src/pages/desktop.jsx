import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./desktop.css";

function Desktop() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.username || "User");
        localStorage.setItem("userName", decoded.name);
      } catch (err) {
        console.error("Invalid token", err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    Cookies.remove("userName");
    setUserName(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="desktop-container">
      <div className="navbar">
        <h2 className="logo">MyApp</h2>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/issue">Issue</NavLink>
          <NavLink to="/request">Request</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="user-menu">
          <div className="user-icon" onClick={toggleDropdown}>
            {userName ? userName[0].toUpperCase() : "?"}
          </div>
          {dropdownOpen && (
            <div className="dropdown">
              {userName ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={() => navigate("/login")}>Login</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="content">
        <Outlet /> {/* Renders current page */}
      </div>
    </div>
  );
}

export default Desktop;
