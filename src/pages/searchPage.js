import React, { useCallback, useEffect, useMemo, useState } from "react";

import { request } from "@octokit/request";

import { Box, Typography } from "@mui/material";

import SearchHeader from "../components/SearchHeader";
import CenterBox from "../components/layout/CenterBox";

import GitHubLogo from "../images/GitHubMark120.png";
import GitHubLogoText from "../images/GitHubLogoText.png";
import _ from "lodash";
import UserCard from "../components/UserCard";
import UserCardGrid from "../components/layout/UserCardGrid";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import SearchPagePagination from "../components/SearchPagePagination";

const SearchPage = () => {
  const [queryResponse, setQueryResponse] = useState(null);
  const authObject = useSelector((state) => state.auth);

  const fetchUsers = async (searchQuery) => {
    if (searchQuery) {
      return await request("GET /search/users", {
        headers: {
          authorization: `token ${authObject.auth.token}`,
        },
        q: searchQuery,
        per_page: 12,
      }).then((res) => {
        setQueryResponse(res);
      });
    } else {
      setQueryResponse(null);
    }
  };

  const debouncedFetchUsers = _.debounce((query) => fetchUsers(query), 1500);

  const onSearchChange = (e) => {
    debouncedFetchUsers(e.target.value);
  };

  const onPageChange = (event, value) => {
    console.log(value);
  };

  const { items, total_count } = queryResponse?.data || {};
  console.log("queryResponse", queryResponse);
  // console.log("items", items);
  // console.log("total_count", total_count);

  return (
    <>
      <SearchHeader onChange={onSearchChange} />

      {!queryResponse && (
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
      {queryResponse && (
        <>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            {total_count} GitHub Users found
          </Typography>
          <UserCardGrid>
            {items.map((user) => (
              <Grid item xs={12} sm={6} key={user.id}>
                <UserCard imgSrc={user.avatar_url} username={user.login} />
              </Grid>
            ))}
          </UserCardGrid>
          <SearchPagePagination onChange={onPageChange} />
        </>
      )}
    </>
  );
};
export default SearchPage;
