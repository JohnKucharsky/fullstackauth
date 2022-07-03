import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout, reset } from "../../features/auth/authSlice";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="header">
      <Link className="header__link" to="/">
        GoalSetter
      </Link>
      <div>
        {user ? (
          <div>
            <Button
              startIcon={<FaSignOutAlt />}
              variant="outlined"
              onClick={() => {
                dispatch(logout());
                dispatch(reset());
                navigate("/");
              }}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="header__right">
            <div>
              <Link className="header__link" to="/login">
                <FaSignInAlt /> Login
              </Link>
            </div>
            <div>
              <Link className="header__link" to="/register">
                <FaUser /> Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
