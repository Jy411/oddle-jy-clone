import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";

import SearchHeader from "../components/SearchHeader";
import CenterBox from "../components/layout/CenterBox";
import UserCard from "../components/UserCard";
import UserCardGrid from "../components/layout/UserCardGrid";
import SearchPagePagination from "../components/SearchPagePagination";

import GitHubLogo from "../images/GitHubMark120.png";
import GitHubLogoText from "../images/GitHubLogoText.png";

import request from "../api/request";

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
  // console.log("queryResponse", queryResponse);
  // console.log("items", items);
  // console.log("total_count", total_count);

  return (
    <>
      <SearchHeader onChange={onSearchChange} />

      {!queryResponse && !loading && (
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
            Enter GitHub username and search users matching the input like
            Google Search, click avatars to view more details, including
            repositories, followers and following.
          </Typography>
        </CenterBox>
      )}

      {loading && (
        <CenterBox>
          <CircularProgress color="success" />
        </CenterBox>
      )}

      {queryResponse && total_count !== 0 && !loading && (
        <>
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
        </>
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
