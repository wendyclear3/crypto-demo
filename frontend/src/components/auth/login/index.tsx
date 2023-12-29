import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { IPropsLogin } from "../../../common/types/auth";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props;
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Authorization
      </Typography>
      <Typography
        variant="body1"
        marginBottom={3}
        fontFamily="Poppins"
        textAlign="center"
      >
        Enter your Email and password
      </Typography>
      <TextField
        error={!!errors.email}
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Enter your email"
        {...register("email", {
          required: "Email is required",
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        })}
        helperText={errors.email ? `${errors.email.message}` : ""}
      />
      <TextField
        error={!!errors.password}
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
        })}
        helperText={errors.password ? `${errors.password.message}` : ""}
      />
      <Button
        type="submit"
        sx={{
          fontFamily: "Poppins",
          marginTop: 2,
          marginBottom: 2,
          width: "60%",
        }}
        variant="contained"
      >
        Login
      </Button>
      <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
        Don't have an account?
        <span className="incitingText" onClick={() => navigate("/register")}>
          Registration
        </span>
      </Typography>
    </>
  );
};

export default LoginPage;
