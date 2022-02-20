import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";

const UserCard = ({
  imgSrc,
  username,
  followingCountUrl,
  followersCountUrl,
}) => {
  const getFollowingCount = async (url) => {
    let count = 0;
    console.log(url);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    return count;
  };

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
              {getFollowingCount(followingCountUrl)} Following
            </Typography>
            <Typography variant="caption" component="p">
              {followersCountUrl} Followers
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserCard;
