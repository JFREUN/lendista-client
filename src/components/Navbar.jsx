import React, { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../images/menu_FILL0_wght400_GRAD0_opsz48.svg";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const handleShow = () => {
    setShowNav(!showNav);
  };

  const closeMenu = () => {
    setShowNav(false);
  };

  return (
    <>
      <nav className="nav">
        <Link to="/" className="homeH1" onClick={closeMenu}>
          {" "}
          <h1>Lendista</h1>
        </Link>
        <div className="navLinks">
        <DesktopNav></DesktopNav>
        </div>

        <Link>
          <img src={hamburger} alt="menuIcon" onClick={handleShow} className="hamburger"/>
        </Link>
      </nav>
      {showNav && <MobileNav closeMenu={closeMenu}/>}
    </>
  );
}

export default Navbar;
