import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import request from "../api/request";

const UserCard = ({ imgSrc, username }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const getFollowersCount = async (username) => {
      await request("GET /users/{username}/followers", {
        username: username,
      }).then((res) => {
        if (isMounted) {
          setFollowersCount(res.data.length);
        }
      });
    };
    const getFollowingCount = async (username) => {
      await request("GET /users/{username}/following", {
        username: username,
      }).then((res) => {
        if (isMounted) {
          setFollowingCount(res.data.length);
        }
      });
    };
    getFollowingCount(username);
    getFollowersCount(username);
    return () => {
      isMounted = false;
    };
  }, [username]);

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
