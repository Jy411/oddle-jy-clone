import React, { createContext, useMemo, useState } from 'react';

import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import store from 'redux/store';

import Favourites from 'pages/favouritesPage';
import SearchPage from 'pages/searchPage';
import UserDetailPage from 'pages/userDetail/userDetailPage';

import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// eslint-disable-next-line import/prefer-default-export
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const Root = () => {
	const [mode, setMode] = useState('light');
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<BrowserRouter>
						<Routes>
							{/* Initial Route to render */}
							<Route element={<App />} path='/'>
								<Route element={<SearchPage />} path='/' />
								<Route element={<Favourites />} path='favourites' />
							</Route>
							<Route element={<UserDetailPage />} path='detail' />
						</Routes>
					</BrowserRouter>
				</Provider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));
