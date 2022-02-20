import React from "react";

import { Box, Typography } from "@mui/material";

import SearchHeader from "../components/SearchHeader";
import CenterBox from "../components/CenterBox";

import GitHubLogo from "../images/GitHubMark120.png";
import GitHubLogoText from "../images/GitHubLogoText.png";

const SearchPage = () => {
  return (
    <>
      <SearchHeader />
      <CenterBox>
        <Box
          component="img"
          alt="github logo"
          src={GitHubLogo}
          sx={{
            width: 120,
          }}
        />
        <Box
          component="img"
          alt="github text"
          src={GitHubLogoText}
          sx={{
            width: 139,
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            maxWidth: 285,
          }}
        >
          Enter GitHub username and search users matching the input like Google
          Search, click avatars to view more details, including repositories,
          followers and following.
        </Typography>
      </CenterBox>
    </>
  );
};
export default SearchPage;
