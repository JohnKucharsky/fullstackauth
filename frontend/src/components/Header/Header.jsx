import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <NavLink to="/">GoalSetter</NavLink>
      <ul>
        <li>
          <NavLink to="/login">
            <FaSignInAlt /> Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            <FaUser /> Register
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
