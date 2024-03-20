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

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
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
      const res = await axios.post(`${API_URL}/users/register`, user);

      if (res.status === 201) {
        toast.success("User registered successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 320,
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
          <div>
            <Typography variant="h5">
              <strong>Welcome!</strong>
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={(e) => handleFormData(e)}
              value={user.username}
              name="username"
              type="text"
              placeholder="username"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => handleFormData(e)}
              value={user.email}
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              required
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
            Register
          </Button>
          <Button
            onClick={() => navigate("/login")}
            size="small"
            variant="text"
            color="primary"
          >
            Already have an account? Sign in
          </Button>
        </Box>
      </form>
    </section>
  );
};

export default Register;
