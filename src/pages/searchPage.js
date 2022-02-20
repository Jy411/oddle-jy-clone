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

const SearchPage = () => {
  const [queryResponse, setQueryResponse] = useState(null);

  const fetchUsers = async (searchQuery) => {
    if (searchQuery) {
      return await request("GET /search/users", {
        q: searchQuery,
      }).then((res) => {
        setQueryResponse(res);
      });
    } else {
      setQueryResponse(null);
    }
  };

  const debouncedFetchUsers = _.debounce((query) => fetchUsers(query), 1500);

  const onChange = (e) => {
    debouncedFetchUsers(e.target.value);
  };

  console.log("queryResponse", queryResponse?.data.items);

  return (
    <>
      <SearchHeader onChange={onChange} />
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
        <UserCardGrid>
          {queryResponse.data.items.map((user) => (
            <Grid item xs={12} sm={6}>
              <UserCard
                key={user.id}
                imgSrc={user.avatar_url}
                username={user.login}
                followingCountUrl={user.following_url}
                followersCountUrl={user.followers_url}
              />
            </Grid>
          ))}
        </UserCardGrid>
      )}
    </>
  );
};
export default SearchPage;
