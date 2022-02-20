import React from "react";

import { Typography } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import FavouritesHeader from "../components/FavouritesHeader";
import CenterBox from "../components/CenterBox";

const FavouritesPage = () => {
  return (
    <>
      <FavouritesHeader />
      <CenterBox>
        <PeopleOutlineIcon sx={{ fontSize: 36 }} />
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            maxWidth: 285,
          }}
        >
          Once you like people, you'll see them here.
        </Typography>
      </CenterBox>
    </>
  );
};

export default FavouritesPage;
