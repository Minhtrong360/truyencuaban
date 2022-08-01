import * as React from "react";
import { Routes, Route } from "react-router-dom";
import PhimGenre from "../components/PhimGenre";
import PhimhayAll from "../components/PhimhayAll";
import PhimmoiAll from "../components/PhimmoiAll";
import PhimphobienAll from "../components/PhimphobienAll";
import PhimSearch from "../components/PhimSearch";

import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";

import NotFoundPage from "../pages/NotFoundPage";
// import AuthRequire from "./AuthRequire";

function Router() {
  const [genreID, setGenreID] = React.useState();
  const [search, setSearch] = React.useState();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            genreID={genreID}
            setGenreID={setGenreID}
            search={search}
            setSearch={setSearch}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="product/hot-move" element={<PhimmoiAll />} />
        <Route path="product/popular-move" element={<PhimphobienAll />} />
        <Route path="product/good-move" element={<PhimhayAll />} />
        <Route
          path="product/genre-move"
          element={<PhimGenre genreID={genreID} />}
        />
        <Route
          path="product/search-move"
          element={<PhimSearch search={search} />}
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
