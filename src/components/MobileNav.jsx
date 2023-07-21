import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function MobileNav({ closeMenu }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <div className="navText">
        <Link to="/products" onClick={closeMenu}>
          Shop
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/signup" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}
        {isLoggedIn && user.role === "Member" && (
          <>
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
            <Link to="/basket" onClick={closeMenu}>
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
    </>
  );
}

export default MobileNav;
