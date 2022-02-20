import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import { request } from "@octokit/request";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

const UserCard = ({ imgSrc, username }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const authObject = useSelector((state) => state.auth);

  const getFollowersCount = useCallback(
    async (username) => {
      await request("GET /users/{username}/followers", {
        headers: {
          authorization: `token ${authObject.auth.token}`,
        },
        username: username,
      }).then((res) => {
        setFollowersCount(res.data.length);
      });
    },
    [authObject.auth.token]
  );

  const getFollowingCount = useCallback(
    async (username) => {
      await request("GET /users/{username}/following", {
        headers: {
          authorization: `token ${authObject.auth.token}`,
        },
        username: username,
      }).then((res) => {
        setFollowingCount(res.data.length);
      });
    },
    [authObject.auth.token]
  );

  useEffect(() => {
    getFollowingCount(username);
    getFollowersCount(username);
  }, [getFollowersCount, getFollowingCount, username]);

  return (
    <Card
      raised
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        height: 80,
      }}
    >
      <CardMedia component="img" src={imgSrc} sx={{ width: 64, height: 64 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="subtitle1" component="p">
            <b>{username}</b>
          </Typography>
          <Box>
            <Typography variant="caption" component="p">
              {followingCount} Following
            </Typography>
            <Typography variant="caption" component="p">
              {followersCount} Followers
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserCard;
