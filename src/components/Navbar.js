import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ChairIcon from "@mui/icons-material/Chair";

function Navbar() {
  return (
    <AppBar position="static" color="warning">
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
