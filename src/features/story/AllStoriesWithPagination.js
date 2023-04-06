import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getStories } from "./storySlice";
import StoriesList from "./StoriesList";
import ClickableLinkChips from "../../components/form/ClickableLinkChips";
import LoadingScreen from "../../components/LoadingScreen";

function AllStoriesWithPagination() {
  const { AllStories, isLoading, error } = useSelector((state) => state.story);

  const noSlide = true;
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const params = useParams();
  const genres = params.genres.replace(/:/g, "");

  useEffect(() => {
    if (params.genres) {
      setPage(1);
      dispatch(getStories({ page: 1, limit: 10000000000 }));
    }
  }, [dispatch, params.genres]);

  let storiesWithGenres = AllStories.filter((story) =>
    story.genres.toLowerCase().includes(genres.toLowerCase())
  );

  if (genres === "hành động") {
    storiesWithGenres = [
      ...storiesWithGenres,
      ...AllStories.filter((story) =>
        story.genres.toLowerCase().includes("action")
      ),
    ];
  }
  if (genres === "action") {
    storiesWithGenres = [
      ...storiesWithGenres,
      ...AllStories.filter((story) =>
        story.genres.toLowerCase().includes("hành động")
      ),
    ];
  }

  const offset = 8 * (page - 1);
  let storiesWithPagination = storiesWithGenres.slice(offset, offset + 8);

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
              <ClickableLinkChips
                page={page}
                setPage={setPage}
                stories={storiesWithGenres}
              />
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default AllStoriesWithPagination;
