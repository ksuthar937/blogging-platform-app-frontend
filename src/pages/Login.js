import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    setUser((preVal) => ({
      ...preVal,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/login`, user);

      if (res.status === 200) {
        dispatch(authActions.login());
        toast.success("Login Successful");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        navigate("/");
      }
    } catch (error) {
      toast.error("Oops! Login Failed");
      console.log(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 360,
            mx: "auto",
            my: 8,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5">
            <strong>Sign In</strong>
          </Typography>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => handleFormData(e)}
              value={user.email}
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              required
              autoFocus
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => handleFormData(e)}
              value={user.password}
              name="password"
              type="password"
              placeholder="password"
              required
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate("/register")}
            size="small"
            variant="text"
            color="primary"
          >
            Don&apos;t have an account? Sign up
          </Button>
        </Box>
      </form>
    </section>
  );
};

export default Login;
