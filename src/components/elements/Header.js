import React, { useContext } from 'react';

import { Box, Switch, Tooltip, Typography, useTheme } from '@mui/material';
import { ColorModeContext } from '../../index';

const Header = ({ headerLabel, icon }) => {
	const colorMode = useContext(ColorModeContext);
	const theme = useTheme();

	const { mode } = theme.palette;

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingY: 1,
				}}
			>
				{headerLabel && (
					<Typography variant='h5' component='div'>
						<b>{headerLabel}</b>
					</Typography>
				)}
				{icon && icon}
				<Tooltip title='Toggle Dark Mode'>
					<Switch
						checked={mode === 'dark'}
						onChange={colorMode.toggleColorMode}
					/>
				</Tooltip>
			</Box>
		</>
	);
};

export default Header;
