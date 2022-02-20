import React from "react";

import { Box, Switch, Tooltip, Typography } from "@mui/material";

const Header = ({ headerLabel }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: 1,
        }}
      >
        <Typography variant="h5" component="div">
          <b>{headerLabel}</b>
        </Typography>
        <Tooltip title="Toggle Dark Mode">
          <Switch />
        </Tooltip>
      </Box>
    </>
  );
};

export default Header;
