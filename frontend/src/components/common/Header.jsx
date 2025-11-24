import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">Chefify</div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className={isActive('/recipes') ? 'active' : ''}>
              All Recipes
            </Link>
          </li>
          <li>
            <Link to="/suggestions" className={isActive('/suggestions') ? 'active' : ''}>
              Get Suggestions
            </Link>
          </li>
          <li>
            <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;