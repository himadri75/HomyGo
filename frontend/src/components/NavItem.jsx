import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative group transition hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
    }
  >
    {({ isActive }) => (
      <>
        {children}
        <span
          className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
        ></span>
      </>
    )}
  </NavLink>
);

export default NavItem;