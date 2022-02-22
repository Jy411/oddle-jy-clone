import { Pagination } from "@mui/material";

const SearchPagePagination = ({ currentPage, onChange }) => {
  return (
    <Pagination
      count={80}
      page={currentPage}
      color="primary"
      variant="outlined"
      shape="rounded"
      onChange={onChange}
      sx={{ alignSelf: "center", py: 2 }}
    />
  );
};

export default SearchPagePagination;
