import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import LoadingScreen from "./LoadingScreen";

import ClickableLinkChips from "./form/ClickableLinkChips";

import StoriesList from "./StoriesList";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../features/story/storySlice";
import { useLocation } from "react-router-dom";

function AllSearchStories() {
  const { AllStories, isLoading, error } = useSelector((state) => state.story);

  const noSlide = true;
  const [page, setPage] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let query = queryParams.get("query");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories({ page: 1, limit: 10000 }));
  }, [dispatch]);
  let result = AllStories.filter((story) =>
    story.title.toLowerCase().includes(query.toLowerCase())
  );

  const offset = 8 * (page - 1);
  let storiesWithPagination = result.slice(offset, offset + 8);

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
            <span>Kết quả: {query}</span>
          </Typography>
        </Stack>

        <Box sx={{ position: "relative", height: 1 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {result.length === 0 && (
                <h1 style={{ textAlign: "center" }}>Không tìm thấy kết quả</h1>
              )}
              {result.length > 0 && (
                <>
                  <StoriesList
                    stories={storiesWithPagination}
                    noSlide={noSlide}
                  />
                  <ClickableLinkChips
                    page={page}
                    setPage={setPage}
                    stories={result}
                  />
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default AllSearchStories;
