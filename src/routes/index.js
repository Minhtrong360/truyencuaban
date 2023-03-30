import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PhimGenre from "../components/PhimGenre";
import PhimhayAll from "../components/PhimhayAll";
import AllStoriesWithPagination from "../components/AllStoriesWithPagination";
import PhimphobienAll from "../components/PhimphobienAll";
import PhimSearch from "../components/PhimSearch";
import ChapterContent from "../features/chapter/ChapterContent";
import ChapterCreate from "../features/chapter/ChapterCreate";
import Subscription from "../features/user/Subscription";

import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import CreateStoryAndChapterPage from "../pages/CreateStoryAndChapterPage";
import EditStoryAndChapterPage from "../pages/EditStoryAndChapterPage";
import DetailPage from "../pages/DetailPage";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";

import SubRequire from "./SubRequire";

import AllHotStoriesWithPagination from "../components/AllHotStoriesWithPagination";
import AllLoveStoriesWithPagination from "../components/AllLoveStoriesWithPagination";
import AllSearchStories from "../components/AllSearchStories";
// import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="story/:id" element={<DetailPage />} />

        <Route
          path="account/editstory/:id"
          element={<EditStoryAndChapterPage />}
        />
        <Route
          path="/story/create"
          element={
            <SubRequire>
              <CreateStoryAndChapterPage />
            </SubRequire>
          }
        />
        <Route
          path="/story/create/chapter"
          element={
            <SubRequire>
              <ChapterCreate />
            </SubRequire>
          }
        />

        <Route path="stories/all" element={<AllStoriesWithPagination />} />
        <Route path="stories/:genres" element={<AllStoriesWithPagination />} />
        <Route
          path="stories/hot-stories"
          element={<AllHotStoriesWithPagination />}
        />
        <Route
          path="stories/love-stories"
          element={<AllLoveStoriesWithPagination />}
        />
        <Route path="product/good-move" element={<PhimhayAll />} />
        <Route path="/login" element={<LoginPage />} />
        {/* toask: tại sao LoginPage k nằm trong AuthRequire mà vẫn xài useLocation được */}
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/account" element={<AccountPage />} />
        <Route path="/subscription" element={<Subscription />} />

        <Route path="/chapter/:id" element={<ChapterContent />} />

        <Route path="/search" element={<AllSearchStories />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;