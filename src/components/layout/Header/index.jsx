import "./index.css";
import { headerNavLinks } from "../../../data";
function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src="/logo.png" alt="logo" />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {headerNavLinks.map((link) => (
                <li className="header__nav-item" key={link.id}>
                  <a href={link.href} className="header__nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
