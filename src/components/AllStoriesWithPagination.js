import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import LoadingScreen from "./LoadingScreen";

import ClickableLinkChips from "./form/ClickableLinkChips";

import StoriesList from "./StoriesList";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../features/story/storySlice";
import { useParams } from "react-router-dom";

function AllStoriesWithPagination() {
  const { AllStories, isLoading, error } = useSelector((state) => state.story);

  const noSlide = true;
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories({ page: 1, limit: 10000000000 }));
  }, [dispatch]);

  const params = useParams();
  const genres = params.genres.replace(/:/g, "");

  let storiesWithGenres = AllStories.filter((story) =>
    story.genres.toLowerCase().includes(genres.toLowerCase())
  );

  const offset = 8 * (page - 1);
  let storiesWithPagination = storiesWithGenres.slice(offset, offset + 8);

  console.log("storiesWithGenres", storiesWithPagination);
  return (
    <Container sx={{ display: "flex", mt: 3 }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          mb={0}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            sx={{
              fontSize: 30,
              fontWeight: 800,
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <span>{genres.toUpperCase()}</span>
          </Typography>
        </Stack>

        <Box sx={{ position: "relative", height: 1 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <StoriesList
                  stories={storiesWithPagination}
                  noSlide={noSlide}
                />
              )}
            </>
          )}
          <ClickableLinkChips
            page={page}
            setPage={setPage}
            stories={storiesWithGenres}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default AllStoriesWithPagination;
