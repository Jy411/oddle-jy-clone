import React, { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";

import CenterBox from "../components/layout/CenterBox";
import UserCard from "../components/UserCard";
import UserCardGrid from "../components/layout/UserCardGrid";
import SearchPagePagination from "../components/SearchPagePagination";

import GitHubLogo from "../images/GitHubMark120.png";
import GitHubLightLogo from "../images/GitHubMarkLight120.png";
import GitHubLogoText from "../images/GitHubLogoText.png";
import GitHubLogoTextWhite from "../images/GitHubLogoTextWhite.png";

import request from "../api/request";
import { SearchHeader, UserDetailHeader } from "../components/Headers";

const SearchPageIntro = () => {
  const theme = useTheme();

  const { mode } = theme.palette;

  return (
    <CenterBox>
      <Box
        component="img"
        alt="github logo"
        src={mode === "dark" ? GitHubLightLogo : GitHubLogo}
        sx={{
          width: 120,
        }}
      />
      <Box
        component="img"
        alt="github text"
        src={mode === "dark" ? GitHubLogoTextWhite : GitHubLogoText}
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
  );
};

const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const onPageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchUsers = () => {
        setLoading(true);

        const fetchingData = async () => {
          return await request("GET /search/users", {
            q: searchQuery,
            page: page,
          })
            .then((res) => {
              setQueryResponse(res);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        };

        fetchingData();
      };

      const debouncedFetchUsers = _.debounce(() => fetchUsers(), 1000);

      debouncedFetchUsers();
    } else {
      setQueryResponse(null);
      setLoading(false);
    }
  }, [searchQuery, page]);

  const { items, total_count } = queryResponse?.data || {};

  return (
    <>
      <SearchHeader onChange={onSearchChange} />

      {loading && (
        <CenterBox>
          <CircularProgress color="success" />
        </CenterBox>
      )}

      {!queryResponse && !loading && <SearchPageIntro />}

      {queryResponse && total_count !== 0 && !loading && (
        <Paper
          elevation={0}
          sx={{ display: "flex", flexDirection: "column", px: 3, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            {total_count} GitHub Users found
          </Typography>
          <UserCardGrid>
            {items.map((user) => (
              <Grid item xs={12} sm={6} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))}
          </UserCardGrid>
          <SearchPagePagination
            totalPages={total_count / 12}
            currentPage={page}
            onChange={onPageChange}
          />
        </Paper>
      )}

      {total_count === 0 && !loading && (
        <CenterBox opacity={1}>
          <SearchIcon />
          <Typography variant="body1">
            No search result found for <b>{searchQuery}</b>
          </Typography>
        </CenterBox>
      )}
    </>
  );
};
export default SearchPage;
