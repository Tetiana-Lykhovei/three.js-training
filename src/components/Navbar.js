import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div>
        <ul className="navbar">
          <li>
            <NavLink
              className="navbar-title"
              to="/boxes"
              activeStyle={{
                backgroundColor: "teal",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Boxes
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar-title"
              to="/chairs"
              activeStyle={{
                backgroundColor: "teal",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Chairs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
