import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { store } from './redux/store';

import App from './App';
import SearchPage from './pages/searchPage';
import Favourites from './pages/favouritesPage';
import UserDetailPage from './pages/userDetail/userDetailPage';
import { Paper } from '@mui/material';

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
							<Route path='/' element={<App />}>
								<Route path='search' element={<SearchPage />} />
								<Route path='favourites' element={<Favourites />} />
							</Route>
							<Route path='detail' element={<UserDetailPage />} />
						</Routes>
					</BrowserRouter>
				</Provider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));
