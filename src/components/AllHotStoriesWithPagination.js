import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import LoadingScreen from "./LoadingScreen";

import ClickableLinkChips from "./form/ClickableLinkChips";

import StoriesList from "./StoriesList";
import { useDispatch, useSelector } from "react-redux";
import { getStoriesWithSort } from "../features/story/storySlice";

function AllHotStoriesWithPagination() {
  const { AllStoriesWithSort, isLoading, error } = useSelector(
    (state) => state.story
  );

  const [page, setPage] = useState(1);
  const noSlide = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoriesWithSort({ page: 1, limit: 10000000000, sort: "view" }));
  }, [dispatch]);

  const offset = 8 * (page - 1);
  let storiesWithPagination = AllStoriesWithSort.slice(offset, offset + 8);

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
            <span>TRUYỆN HOT</span>
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
            stories={AllStoriesWithSort}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default AllHotStoriesWithPagination;
