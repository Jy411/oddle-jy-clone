import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

import request from "../api/request";

import {
  addUserToFavourites,
  removeUserFromFavourites,
} from "../redux/userFavourites";

const UserCard = ({ user }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const dispatch = useDispatch();
  const { userFavourites } = useSelector((state) => state.userFavourites);

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
    getFollowingCount(user.login);
    getFollowersCount(user.login);
    return () => {
      isMounted = false;
    };
  }, [user]);

  const addToFavourites = () => {
    dispatch(addUserToFavourites(user));
  };

  const removeFromFavourites = () => {
    dispatch(removeUserFromFavourites(user));
  };

  return (
    <Card
      raised
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        height: 70,
        borderRadius: 3,
      }}
    >
      <CardMedia
        component="img"
        src={user.avatar_url}
        sx={{ width: 64, height: 64 }}
      />
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography noWrap variant="subtitle1" component="p">
            <b>{user.login}</b>
          </Typography>
          {userFavourites.includes(user) ? (
            <FavoriteIcon
              onClick={removeFromFavourites}
              sx={{ color: pink[500] }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={addToFavourites}
              sx={{ color: pink[500] }}
            />
          )}
        </Box>
        <Box>
          <Typography variant="caption" component="p">
            {followingCount} Following
          </Typography>
          <Typography variant="caption" component="p">
            {followersCount} Followers
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default UserCard;
