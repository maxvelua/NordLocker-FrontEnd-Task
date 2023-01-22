import "./style.scss";
import { ReactComponent as Logo } from "../../assets/icons/logo-tesoservers.svg";
import { ReactComponent as Hamburger } from "../../assets/icons/icon-hamburger.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
  onLogoutClick: () => void;
  isAuthenticated: boolean;
}

export function Header({ onLogoutClick, isAuthenticated }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function handleHamburgerClick() {
    setIsExpanded(!isExpanded);
  }

  function handleLogoutClick() {
    onLogoutClick();
    handleLinkClick();
  }

  function handleLinkClick() {
    if (isExpanded) {
      setIsExpanded(false);
    }
  }

  return (
    <header className="header">
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <button
        className="header__hamburger"
        onClick={handleHamburgerClick}
        data-testid="hamburger-menu"
      >
        <Hamburger />
      </button>
      <div
        className={isExpanded ? "header__menu--expanded" : "header__menu"}
        data-testid="header-menu"
      >
        <Link to="/" className="disable-link-style" onClick={handleLinkClick}>
          <p className="header__item">Main</p>
        </Link>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="disable-link-style"
            onClick={handleLinkClick}
          >
            <p className="header__item">Login</p>
          </Link>
        )}

        {isAuthenticated && (
          <>
            <Link
              to="/servers"
              className="disable-link-style"
              onClick={handleLinkClick}
            >
              <p className="header__item">Servers</p>
            </Link>
            <Link
              to="/"
              onClick={handleLogoutClick}
              className="disable-link-style"
            >
              <p className="header__item">Logout</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
