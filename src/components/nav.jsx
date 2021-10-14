import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <ul className="nav-items">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Create Poll</Link>
        </li>
        <li>
          <Link to="/question-details/:id">Question Details</Link>
        </li>
        <li>
          <Link to="/leader-boards">LeaderBoards</Link>
        </li>
        <li>
          <Link to="/logout">log out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
