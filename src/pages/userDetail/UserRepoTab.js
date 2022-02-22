import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import TabPanel from "../../components/elements/TabPanel";
import UserCardGrid from "../../components/layout/UserCardGrid";
import RepoCard from "../../components/RepoCard";
import { Box, CircularProgress, Paper } from "@mui/material";

const UserRepoTab = ({ value, reposUrl }) => {
  const [loading, setLoading] = useState(false);
  const [userRepos, setUserRepos] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchPublicRepos = async () => {
      await fetch(reposUrl)
        .then((res) => res.json())
        .then((data) => {
          setUserRepos(data);
          setLoading(false);
        });
    };
    fetchPublicRepos();
  }, [reposUrl]);

  return (
    <TabPanel value={value} index={0}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <UserCardGrid>
          {userRepos.map((repo) => (
            <Grid item xs={12} sm={6} key={repo.id}>
              <RepoCard repoDetails={repo} />
            </Grid>
          ))}
        </UserCardGrid>
      )}
    </TabPanel>
  );
};
export default UserRepoTab;
