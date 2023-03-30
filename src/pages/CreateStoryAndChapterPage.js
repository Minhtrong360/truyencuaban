import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import ChapterCreate from "../features/chapter/ChapterCreate";

import LoadingScreen from "../components/LoadingScreen";
import StoryCreate from "../features/story/StoryCreate";

function CreateStoryAndChapterPage() {
  const [loading, setLoading] = useState(false);

  const [isCreating, setIsCreating] = useState(true);

  console.log("isCreating in Create...", isCreating);

  return (
    <Container sx={{ my: 3, overflowAnchor: "none" }}>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={12}>
                  <Typography
                    variant="h4"
                    sx={{
                      paddingTop: 2,
                      borderRadius: 2,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    Truyện của bạn
                  </Typography>
                  <Box
                    p={2}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <StoryCreate
                      isCreating={isCreating}
                      setIsCreating={setIsCreating}
                    />
                  </Box>
                  {!isCreating && (
                    <>
                      <Box
                        p={2}
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      ></Box>
                      <Box
                        p={2}
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <ChapterCreate />
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </Card>
          </>
        )}
      </Box>
    </Container>
  );
}

export default CreateStoryAndChapterPage;
