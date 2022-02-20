import { Pagination } from "@mui/material";

const SearchPagePagination = ({ totalPages, onChange }) => {
  return (
    <Pagination
      count={10}
      color="primary"
      variant="outlined"
      shape="rounded"
      onChange={onChange}
      sx={{ alignSelf: "center" }}
    />
  );
};

export default SearchPagePagination;
