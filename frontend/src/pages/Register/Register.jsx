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
  console.log(user);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = () => {
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
      <div key={v}>
        <p>{v}*</p>
        <TextField
          required
          InputLabelProps={{ shrink: false }}
          placeholder={v}
          sx={{
            marginBottom: "0.5rem ",
            backgroundColor: "#F6F7FB",
          }}
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
    <div>
      <h3>
        <FaUser /> Register
      </h3>
      <p>Please create an account</p>
      {Object.keys(formData).map((v) => inputJSX(v))}
      <Button onClick={() => onSubmit()} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default Register;
