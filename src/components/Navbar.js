import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ChairIcon from "@mui/icons-material/Chair";
import { Button, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isLogin);

  const handleLogout = () => {
    navigate("/login");
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#64dd17" }}>
      <Container maxWidth="2xl">
        <Toolbar>
          <ChairIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGS
          </Typography>
          {!isLogin && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
          {isLogin && (
            <>
              <Button color="inherit" onClick={() => handleLogout()}>
                Logout
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
