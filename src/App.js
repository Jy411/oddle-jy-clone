import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TabNavigation = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          component={Link}
          to="/search"
        />
        <BottomNavigationAction
          label="Favourites"
          icon={<FavoriteIcon />}
          component={Link}
          to="/favourites"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default function App() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
      }}
    >
      <TabNavigation />
      <Outlet />
    </Container>
  );
}
