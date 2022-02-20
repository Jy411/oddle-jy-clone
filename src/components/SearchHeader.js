import React from "react";
import { Box, TextField } from "@mui/material";
import Header from "./Header";

const Searchbar = ({ onChange }) => {
  return (
    <TextField
      fullWidth
      label="Enter GitHub username, i.e. gaearon"
      placeholder="Enter GitHub username, i.e. gaearon"
      id="searchbar"
      onChange={onChange}
    />
  );
};

const SearchHeader = ({ onChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header headerLabel="Search" />
      <Searchbar onChange={onChange} />
    </Box>
  );
};

export default SearchHeader;
