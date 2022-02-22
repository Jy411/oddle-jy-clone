import React from "react";
import { useSelector } from "react-redux";

import { Paper, Typography } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Grid from "@mui/material/Grid";

import CenterBox from "../components/layout/CenterBox";
import UserCardGrid from "../components/layout/UserCardGrid";
import UserCard from "../components/UserCard";
import { FavouritesHeader } from "../components/Headers";

const FavouritesPage = () => {
  const { userFavourites } = useSelector((state) => state.userFavourites);

  return (
    <>
      <FavouritesHeader />

      {userFavourites.length === 0 && (
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
      )}

      {userFavourites.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 2,
            height: "100vh",
          }}
        >
          <UserCardGrid>
            {userFavourites.map((user) => {
              return (
                <Grid item xs={12} sm={6} key={user.id}>
                  <UserCard user={user} />
                </Grid>
              );
            })}
          </UserCardGrid>
        </Paper>
      )}
    </>
  );
};

export default FavouritesPage;
