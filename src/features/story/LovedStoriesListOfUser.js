import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import StoryCard from "./StoryCard";
import useAuth from "../../hooks/useAuth";
import { getLovedStoriesOfUser } from "./storySlice";
import LovedStoryCard from "./LovedStoryCard";

function LovedStoriesListOfUser() {
  const auth = useAuth();
  const userId = auth.user._id;
  const [page, setPage] = useState(1);
  const { lovedStoriesOfUser, totalStories, isLoading } = useSelector(
    (state) => state.story
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLovedStoriesOfUser({ userId }));
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {lovedStoriesOfUser.length > 0 ? (
        lovedStoriesOfUser?.map((story) => (
          <LovedStoryCard key={story._id} story={story} userId={userId} />
        ))
      ) : (
        <Typography variant="h6">No Story </Typography>
      )}
    </Box>
  );
}

export default LovedStoriesListOfUser;
