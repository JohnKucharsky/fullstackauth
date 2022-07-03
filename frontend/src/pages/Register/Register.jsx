import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

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
  }, [user, isError, isSuccess, navigate, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
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
          <FaUser /> Register
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

export default Register;
