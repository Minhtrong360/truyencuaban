import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ClickableLinkChips from "../../components/form/ClickableLinkChips";
import StoryCard from "./StoryCard";
import useAuth from "../../hooks/useAuth";
import { getStoriesOfUser } from "./storySlice";

function StoriesListOfUser() {
  const auth = useAuth();
  const userId = auth.user._id;
  const [page, setPage] = useState(1);
  const { storiesOfUser, totalPages, totalStories, isLoading } = useSelector(
    (state) => state.story
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoriesOfUser({ limit: 10000, userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, [page]);

  const offset = 8 * (page - 1);
  let storiesWithPagination = storiesOfUser.slice(offset, offset + 8);
  console.log({ storiesOfUser });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {storiesOfUser.length > 0 ? (
        <>
          {storiesWithPagination.map((story) => (
            <StoryCard key={story._id} story={story} userId={userId} />
          ))}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ClickableLinkChips
              page={page}
              setPage={setPage}
              stories={storiesOfUser}
            />
          </Box>
        </>
      ) : (
        <Typography variant="h6">No Story</Typography>
      )}
    </Box>
  );
}

export default StoriesListOfUser;
