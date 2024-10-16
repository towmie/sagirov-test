import React, { useState } from "react";
import "./index.css";
import { headerNavLinks } from "../../../data";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src="/logo.png" alt="logo" />
          </div>
          <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
            <button className="header__close-button" onClick={toggleMenu}>
              &times;
            </button>
            <ul className="header__nav-list">
              {headerNavLinks.map((link) => (
                <li className="header__nav-item" key={link.id}>
                  <a
                    href={link.href}
                    className="header__nav-link"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="header__menu-button" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
