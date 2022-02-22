import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import TabPanel from "../../components/elements/TabPanel";
import UserCard from "../../components/UserCard";
import UserCardGrid from "../../components/layout/UserCardGrid";
import { Box, CircularProgress } from "@mui/material";

const UserFollowingTab = ({ value, followingUrl }) => {
  const [loading, setLoading] = useState(false);
  const [userFollowing, setUserFollowing] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchUsersFollowing = async () => {
      await fetch(followingUrl.replace("{/other_user}", ""))
        .then((res) => res.json())
        .then((data) => {
          setUserFollowing(data);
          setLoading(false);
        });
    };
    fetchUsersFollowing();
  }, [followingUrl]);

  return (
    <TabPanel value={value} index={2}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <UserCardGrid>
          {userFollowing.map((user) => (
            <Grid item xs={12} sm={6} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </UserCardGrid>
      )}
    </TabPanel>
  );
};

export default UserFollowingTab;
