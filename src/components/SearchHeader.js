import React from "react";
import { Box, TextField } from "@mui/material";
import Header from "./Header";

const Searchbar = () => {
  return (
    <TextField
      fullWidth
      label="Enter GitHub username, i.e. gaearon"
      placeholder="Enter GitHub username, i.e. gaearon"
      id="searchbar"
    />
  );
};

const SearchHeader = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header headerLabel="Search" />
      <Searchbar />
    </Box>
  );
};

export default SearchHeader;
