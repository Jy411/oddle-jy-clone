import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { store } from "./redux/store";

import App from "./App";
import SearchPage from "./pages/searchPage";
import Favourites from "./pages/favouritesPage";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Initial Route to render */}
        <Route path="/" element={<App />}>
          <Route path="search" element={<SearchPage />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
