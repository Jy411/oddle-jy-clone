import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTokenAuth } from "@octokit/auth-token";

import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { setAuth } from "./redux/auth";

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

const App = () => {
  const [token, setToken] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuth = async () => {
      const auth = createTokenAuth("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");
      return await auth();
    };
    fetchAuth().then((token) => {
      setToken(token);
      localStorage.setItem("token", token.token);
    });
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(setAuth(token));
    }
  }, [dispatch, token]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
        p: 0,
      }}
    >
      <TabNavigation />
      <Outlet />
    </Container>
  );
};

export default App;
