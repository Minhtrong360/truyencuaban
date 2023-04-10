import { useState } from "react";
import { Card, Grid, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";

import { useDispatch } from "react-redux";

import { deleteStory } from "./storySlice";
import StoryGenenal from "./StoryGeneral";

function StoryCard({
  story,
  userId,
  setPage,
  storiesOfUserFake,
  setStoriesOfUserFake,
}) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleDeleteStory = async () => {
    await dispatch(deleteStory({ storyId: story._id, userId }));

    setStoriesOfUserFake((prevStories) =>
      prevStories.filter((s) => s._id !== story._id)
    );
    const numStories = storiesOfUserFake?.length - 1; // Subtract 1 for the deleted story
    const elementsPerPage = 8;
    const newPageNumber = Math.ceil(numStories / elementsPerPage);
    console.log("numStories", numStories);
    console.log("newPageNumber", newPageNumber);

    // Set the new page number
    setPage(newPageNumber);
  };

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleDelete = () => {
  //   setAnchorEl(null);

  //   dispatch(deletePost({ postId: post._id, userId }));
  // };
  // const handleEdit = () => {
  //   setAnchorEl(null);
  //   setIsEdit(true);
  // };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "right",
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleEdit} sx={{ mx: 1 }}>
  //       Edit
  //     </MenuItem>

  //     <MenuItem onClick={handleDelete} sx={{ mx: 1 }}>
  //       Delete
  //     </MenuItem>
  //   </Menu>
  // );

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
                  alignItems: "center",
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
                  <Link
                    to={`/story/${story._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      color="text.primary"
                      p={1}
                      sx={{
                        overflow: "auto",
                        textAlign: "justify",
                        fontSize: "30px",
                        textDecoration: "none",
                        wordWrap: "break-word",
                        maxWidth: "700px",
                      }}
                    >
                      {story?.title.toUpperCase()}
                    </Typography>
                  </Link>

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
                    right: 100,
                    top: 0,
                  }}
                  onClick={() => navigate(`editstory/${story._id}`)}
                >
                  Edit
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "30px",
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                  onClick={handleDeleteStory}
                >
                  Delete
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

export default StoryCard;
