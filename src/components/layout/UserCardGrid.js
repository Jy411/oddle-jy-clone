import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserCard from "../UserCard";

const UserCardGrid = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, mt: 1 }}>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Box>
  );
};

export default UserCardGrid;
