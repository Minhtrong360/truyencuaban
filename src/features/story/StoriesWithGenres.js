import React from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import LoadingScreen from "../../components/LoadingScreen";

import StoriesList from "../story/StoriesList";

import { useNavigate } from "react-router-dom";

function StoriesWithGenres({ AllStories, genres, isLoading, error }) {
  const navigate = useNavigate();
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
  return (
    <Container sx={{ display: "flex", mt: 3, height: "40rem" }}>
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
              alignItems: "center",
            }}
          >
            <span>{genres.toUpperCase()}</span>

            <Button
              onClick={() => navigate(`stories/:${genres}`)}
              sx={{ fontSize: "26px" }}
            >
              XEM TẤT CẢ ▼
            </Button>
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
                <StoriesList stories={storiesWithGenres} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default StoriesWithGenres;
