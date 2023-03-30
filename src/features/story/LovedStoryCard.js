import { useState } from "react";
import { Card, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import { useDispatch } from "react-redux";

import StoryGenenal from "../StoryGeneral";
import { deleteStory } from "./storySlice";

function LovedStoryCard({ story, userId }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  console.log("story in LovedStoryCard:", story);

  const handleRead = () => {
    navigate(`../story/${story._id}`);
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={6} lg={12}>
          <Box p={2}>
            {!isEditing && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: 250,
                    height: 350,
                  }}
                  src={story?.cover}
                  alt="story"
                />
                <Box>
                  <Typography
                    color="text.primary"
                    p={1}
                    sx={{
                      overflow: "auto",
                      textAlign: "justify",
                      fontSize: "30px",
                    }}
                  >
                    {story?.title.toUpperCase()}
                  </Typography>
                  <Typography
                    color="text.primary"
                    p={1}
                    sx={{
                      overflow: "auto",
                      textAlign: "justify",
                    }}
                  >
                    Author: {story?.authorName}
                  </Typography>
                  <Typography
                    color="text.primary"
                    p={1}
                    sx={{
                      overflow: "auto",
                      textAlign: "justify",
                    }}
                  >
                    Artist: {story?.artist}
                  </Typography>
                  <Typography
                    variant="h7"
                    paragraph
                    p={1}
                    sx={{
                      overflow: "auto",
                      textAlign: "justify",
                    }}
                  >
                    Thể loại:
                    {story?.genres}
                  </Typography>

                  <Typography
                    color="text.primary"
                    p={1}
                    sx={{
                      overflow: "auto",
                      textAlign: "justify",
                    }}
                  >
                    Minimum Age: {story?.minimumAge}
                  </Typography>
                  <Typography
                    color="text.primary"
                    p={1}
                    sx={{
                      textAlign: "justify",
                      maxHeight: "130px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Summarize: {story?.summarize}
                  </Typography>
                </Box>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "30px",
                    position: "absolute",
                    right: 0,
                    top: 4,
                  }}
                  onClick={handleRead}
                >
                  READ
                </LoadingButton>
              </Box>
            )}
            {isEditing && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <StoryGenenal setIsEditing={setIsEditing} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LovedStoryCard;
