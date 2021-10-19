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
                padding: "10px",
                border: "1px solid white",
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
                padding: "10px",
                border: "1px solid white",
                borderRadius: "8px",
              }}
            >
              Chairs
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar-title"
              to="/some"
              activeStyle={{
                padding: "10px",
                border: "1px solid white",
                borderRadius: "8px",
              }}
            >
              Some
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
