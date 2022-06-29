import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <NavLink to="/">GoalSetter</NavLink>
      <ul>
        {user ? (
          <li>
            <NavLink to="/login">
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(logout());
                  dispatch(reset());
                  navigate("/");
                }}>
                <FaSignOutAlt /> Logout
              </Button>
            </NavLink>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
