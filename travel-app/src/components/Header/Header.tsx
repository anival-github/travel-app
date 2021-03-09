import React from 'react';
import { Link } from 'react-router-dom';

const Header:React.FC = () => (
  <div>
    Header
    <Link to="/">Home</Link>
    <Link to="/country">Country</Link>
  </div>
);

export default Header;
