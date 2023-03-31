import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ClickableLinkChips from "../../components/form/ClickableLinkChips";
import StoryCard from "./StoryCard";
import useAuth from "../../hooks/useAuth";
import { getStoriesOfUser } from "./storySlice";
import LoadingScreen from "../../components/LoadingScreen";

function StoriesListOfUser() {
  const auth = useAuth();
  const userId = auth.user._id;
  const [page, setPage] = useState(1);
  const { storiesOfUser, isLoading } = useSelector((state) => state.story);
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
    <Box sx={{ position: "relative", height: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
      )}
    </Box>
  );
}

export default StoriesListOfUser;
