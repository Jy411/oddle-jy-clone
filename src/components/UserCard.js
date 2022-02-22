import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import LinearProgress from "@mui/material/LinearProgress";

import request from "../api/request";

import {
  addUserToFavourites,
  removeUserFromFavourites,
} from "../redux/userFavourites";
import StyledCard from "./elements/StyledCard";

const UserCard = ({ user }) => {
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const { userFavourites } = useSelector((state) => state.userFavourites);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getUserDetails = async (username) => {
      await request("GET /users/{username}", {
        username: username,
      }).then((res) => {
        if (isMounted) {
          setUserDetail(res.data);
          setFollowingCount(res.data.following);
          setFollowersCount(res.data.followers);
          setLoading(false);
        }
      });
    };
    getUserDetails(user.login);
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
    <StyledCard>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            color="secondary"
            sx={{ height: 15, borderRadius: 5 }}
          />
        </Box>
      ) : (
        <>
          <CardMedia
            onClick={() => navigate("/detail", { state: { userDetail } })}
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
              <Typography noWrap variant="caption" component="p">
                {followingCount} Following
              </Typography>
              <Typography noWrap variant="caption" component="p">
                {followersCount} followers
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </StyledCard>
  );
};

export default UserCard;
