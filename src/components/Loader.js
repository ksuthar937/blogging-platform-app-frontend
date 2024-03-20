import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "45%",
        left: "45%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          width: 100,
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" thickness={6} size={25} />
        <Typography>Loading...</Typography>
      </Box>
    </Box>
  );
};

export default Loader;
