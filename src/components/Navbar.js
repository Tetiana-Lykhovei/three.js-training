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
              to="/shoes"
              activeStyle={{
                padding: "10px",
                border: "1px solid white",
                borderRadius: "8px",
              }}
            >
              Shoe
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
