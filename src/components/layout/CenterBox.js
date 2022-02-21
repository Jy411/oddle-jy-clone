import React from "react";

import { Box } from "@mui/material";

const CenterBox = ({ children, opacity }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity || 0.5,
      }}
    >
      {children}
    </Box>
  );
};

export default CenterBox;
