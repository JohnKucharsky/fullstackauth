import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onSubmit = () => {};

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
