import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, user, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <div style={{ color: "red", fontSize: "2rem" }}>Waiting</div>;
  }
  // input field
  const inputJSX = (v) => {
    return (
      <div style={{ marginBottom: "0.7rem" }} key={v}>
        <TextField
          required
          label={v}
          placeholder={v}
          value={formData[v]}
          onChange={(e) =>
            setFormData((x) => ({
              ...x,
              [v]: e.target.value,
            }))
          }
        />
      </div>
    );
  };
  // input field

  return (
    <div className="center">
      <div className="headerform">
        <h3>
          <FaSignInAlt /> Login
        </h3>
        <p>Please create an account</p>
      </div>
      <form onSubmit={onSubmit}>
        {Object.keys(formData).map((v) => inputJSX(v))}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
