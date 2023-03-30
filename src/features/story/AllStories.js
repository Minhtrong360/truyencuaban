import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
// import ProductFilter from "./ProductFilter";
// import ProductSearch from "./ProductSearch";
// import ProductSort from "./ProductSort";

import apiService from "../../app/apiService";
import apiService2 from "../../app/apiService2";
// import orderBy from "lodash/orderBy";
import LoadingScreen from "../../components/LoadingScreen";
import { API_KEY } from "../../app/config";
import StoriesList from "../../components/StoriesList";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "./storySlice";

function AllStories() {
  const [page, setPage] = useState(1);
  const { AllStories, currentPageStories, isLoading, totalPosts, error } =
    useSelector((state) => state.story);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories({ page }));
  }, [dispatch, page, totalPosts]);

  console.log("AllStories", AllStories);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
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
            <span>All Stories</span>
            <a style={{ cursor: "pointer" }} href="stories/all">
              XEM TẤT CẢ ▼{" "}
            </a>
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
                <StoriesList stories={AllStories} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default AllStories;
