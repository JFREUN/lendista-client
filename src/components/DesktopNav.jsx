import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function DesktopNav() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="desktopNavText">
      <Link to="/products" className="linkHover">
        Shop
      </Link>

      {!isLoggedIn && (
        <>
          <Link to="/login" className="linkHover">
            Login
          </Link>
          <Link to="/signup" className="linkHover">
            Sign Up
          </Link>
        </>
      )}
      {isLoggedIn && user.role === "Member" && (
        <>
          <Link to="/profile" className="linkHover">
            Profile
          </Link>
          <Link to="/basket" className="linkHover">
            Basket
          </Link>
          <button onClick={logOutUser} className="logoutBtn">
            Logout
          </button>
        </>
      )}
      {isLoggedIn && user.role === "Admin" && (
        <>
          <Link to="/admin/dashboard" className="linkHover dashboardLink">
            Dashboard
          </Link>
          <button onClick={logOutUser} className="logoutBtn">
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default DesktopNav;
