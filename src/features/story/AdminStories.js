import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ClickableLinkChips from "../../components/form/ClickableLinkChips";
import StoryCard from "./StoryCard";
import useAuth from "../../hooks/useAuth";
import { getStories } from "./storySlice";
import LoadingScreen from "../../components/LoadingScreen";

function AdminStories() {
  const auth = useAuth();
  const userId = auth?.user._id;
  const [page, setPage] = useState(1);
  const { AllStories, isLoading } = useSelector((state) => state.story);
  const [storiesOfUserFake, setStoriesOfUserFake] = useState(AllStories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories({ page, limit: 10000 }));
  }, [dispatch, page]);

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, [page]);

  const offset = 8 * (page - 1);
  let storiesWithPagination = storiesOfUserFake.slice(offset, offset + 8);

  return (
    <Box sx={{ position: "relative", height: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {storiesOfUserFake.length > 0 ? (
            <>
              {storiesWithPagination.map((story) => (
                <StoryCard
                  key={story?._id}
                  story={story}
                  userId={userId}
                  page={page}
                  setPage={setPage}
                  setStoriesOfUserFake={setStoriesOfUserFake}
                  storiesOfUserFake={storiesOfUserFake}
                  admin="true"
                />
              ))}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ClickableLinkChips
                  page={page}
                  setPage={setPage}
                  stories={storiesOfUserFake}
                />
              </Box>
            </>
          ) : (
            <Typography variant="h6">No Story</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default AdminStories;
