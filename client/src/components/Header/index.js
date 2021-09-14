import React from "react";
import { Link } from "react-router-dom";

const Header = ({ setIsLogin }) => {
  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo">
        <h1 className="logo__heading">
          <Link to="/">Vertical Notes</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Note</Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
