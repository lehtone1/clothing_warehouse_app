import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <div>
    <Link className="Product-category-button" to="/jackets">
      <span className="Product-category-info">Jackets</span>
    </Link>
    <Link className="Product-category-button" to="/shirts">
      <span className="Product-category-info">Shirts</span>
    </Link>
    <Link className="Product-category-button" to="/accessories">
      <span className="Product-category-info">Accessories</span>
    </Link>
  </div>
);

export default Header;
