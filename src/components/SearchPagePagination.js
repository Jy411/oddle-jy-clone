import React from 'react';

import { Pagination } from '@mui/material';

const SearchPagePagination = ({ currentPage, onChange }) => {
	return (
		<Pagination
			color='primary'
			count={80}
			page={currentPage}
			shape='rounded'
			sx={{ alignSelf: 'center', py: 2 }}
			variant='outlined'
			onChange={onChange}
		/>
	);
};

export default SearchPagePagination;
