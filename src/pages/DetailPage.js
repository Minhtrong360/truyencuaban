import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import apiService2 from "../app/apiService2";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CommentForm from "../features/comment/CommentForm";
import { styled } from "@mui/material/styles";

import CommentList from "../features/comment/CommentList";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleStory,
  updateReactionStory,
} from "../features/story/storySlice";
import { updateLovedStory } from "../features/user/userSlice";
import useAuth from "../hooks/useAuth";

import ChapterGeneral from "../features/chapter/ChapterGeneral";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",

  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "center",
    paddingRight: theme.spacing(3),
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  "&:hover": {
    color: "orange",
    textDecoration: "none",
  },
}));

function DetailPage() {
  const [chapter, setChapter] = useState(null);

  const [error, setError] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { story, isLoading } = useSelector((state) => state.story);

  const { user } = useAuth();

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleStory({ storyId: params.id }));
    }
  }, [params, dispatch]);

  const handleClickLike = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      dispatch(updateReactionStory({ storyId: story._id }, { data: "like" }));
    }
  };
  const handleClickDisLike = async (e) => {
    e.preventDefault();
    console.log("handleClickDisLike");
    if (!user) {
      navigate("/login");
    } else {
      dispatch(
        updateReactionStory({ storyId: story._id }, { data: "disLike" })
      );
    }
  };

  const handleLoveStory = () => {
    if (!user) {
      navigate("/login");
    } else {
      console.log("user");
      dispatch(updateLovedStory({ userId: user?._id, lovedStory: story?._id }));
    }
  };

  const lovedStory = user?.lovedStory?.find(
    (storyLoved) => storyLoved === story?._id
  );
  useEffect(() => {
    if (params.id) {
      const getChapters = async () => {
        try {
          const res = await apiService2.get(`/chapters/story/${params.id}`);

          setChapter(res.data.data.chapters);

          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      };
      getChapters();
    }
  }, [params]);

  const [currentTab, setCurrentTab] = useState("chương");
  const PROFILE_TAB = [
    {
      value: "chương",
      component: (
        <Container
          sx={{
            my: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "90% !important",
              }}
            >
              {chapter?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    color="text.primary"
                    fontSize="26px"
                    p={1}
                    sx={{ overflow: "auto", textAlign: "center" }}
                  >
                    DANH SÁCH CHƯƠNG
                  </Typography>
                </Box>
              )}
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {chapter?.slice(0, 15).map((chapter, index) => (
                  <Grid item xs={6} md={4} lg={2.4} key={chapter._id}>
                    <ChapterGeneral
                      chapter={chapter}
                      loading={isLoading}
                      error={error}
                    />
                  </Grid>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      ),
    },
    {
      value: "Bình luận",
      component: (
        <Grid item xs={12} md={6} lg={2.4} width="80% !important">
          <CommentForm storyId={params.id} />
          <br />
          <CommentList storyId={params.id} />
        </Grid>
      ),
    },
  ];

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container sx={{ my: 3, overflowAnchor: "none" }}>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {story && (
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        // backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                      onClick={handleLoveStory}
                    >
                      {!lovedStory && (
                        <FavoriteBorderIcon sx={{ fontSize: "40px" }} />
                      )}
                      {lovedStory && <FavoriteIcon sx={{ fontSize: "40px" }} />}
                    </IconButton>
                    <Card>
                      <Grid container>
                        <Grid item xs={12} md={6} lg={12}>
                          <Box p={2}>
                            <Box
                              sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component="img"
                                sx={{
                                  width: 300,
                                  height: 400,
                                  marginRight: 3,
                                }}
                                src={story?.cover}
                                alt={story?.title}
                              />
                              <Box>
                                <Typography
                                  color="text.primary"
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "center", // center the title text
                                    fontSize: "30px",
                                    textDecoration: "none",
                                    wordWrap: "break-word",
                                    maxWidth: "90%", // set the maximum width to 70%
                                    margin: "auto", // center the title horizontally
                                  }}
                                >
                                  {story?.title?.toUpperCase()}
                                </Typography>
                                <Typography
                                  color="text.primary"
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "justify",
                                    textDecoration: "none",
                                  }}
                                >
                                  Tác giả:
                                  <br />
                                  {story?.authorName !== "Đang Cập Nhật" ? (
                                    <StyledLink
                                      to={`/author/${story?.authorName}`}
                                    >
                                      {story?.authorName}
                                    </StyledLink>
                                  ) : (
                                    story?.authorName
                                  )}
                                </Typography>
                                <Typography
                                  color="text.primary"
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "justify",
                                  }}
                                >
                                  Họa sĩ:
                                  <br />
                                  {story?.artist !== "Đang Cập Nhật" ? (
                                    <StyledLink to={`/artist/${story?.artist}`}>
                                      {story?.artist}
                                    </StyledLink>
                                  ) : (
                                    story?.artist
                                  )}
                                </Typography>
                                <Typography
                                  variant="h7"
                                  paragraph
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "justify",
                                    margin: 0,
                                  }}
                                >
                                  Thể loại:
                                  <br />
                                  {story?.genres?.map((genre) => (
                                    <Chip
                                      key={genre}
                                      label={genre}
                                      component={Link}
                                      to={`/stories/:${genre}`}
                                      sx={{
                                        margin: "0.5rem",
                                        cursor: "pointer",
                                        "&:hover": {
                                          color: "orange", // add color property to change text color on hover
                                        },
                                      }}
                                    />
                                  ))}
                                </Typography>
                                <Typography
                                  color="text.primary"
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "justify",
                                  }}
                                >
                                  Tuổi tối thiểu:
                                  <br />
                                  {story?.minimumAge}
                                </Typography>
                                <Typography
                                  color="text.primary"
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "justify",
                                  }}
                                >
                                  Giới thiệu:
                                  <br />
                                  {story?.summarize}
                                </Typography>
                                <Box
                                  color="text.primary"
                                  p={1}
                                  sx={{
                                    overflow: "auto",
                                    textAlign: "justify",
                                    display: "flex",
                                  }}
                                >
                                  <VisibilityIcon />
                                  <Box sx={{ marginLeft: 1 }}>
                                    {story?.view}
                                  </Box>
                                  <Button
                                    sx={{
                                      p: 0,
                                      color: "white",
                                      marginLeft: 2,
                                      borderRadius: "50%",
                                    }}
                                    onClick={(e) => handleClickLike(e)}
                                  >
                                    <ThumbUpOffAltIcon />
                                  </Button>
                                  <Box>{story?.reactions?.like}</Box>
                                  <Button
                                    sx={{
                                      p: 0,
                                      color: "white",
                                      marginLeft: 2,
                                      borderRadius: "50%",
                                    }}
                                    onClick={(e) => handleClickDisLike(e)}
                                  >
                                    <ThumbDownOffAltIcon />
                                  </Button>
                                  <Box>{story?.reactions?.disLike}</Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                )}

                <Box
                  p={2}
                  sx={{
                    mt: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 0,
                    alignItems: "center",
                  }}
                >
                  <Card
                    sx={{
                      ml: 0,
                      mr: 0,
                      mb: 2,
                      height: "50px",
                      width: "100%",
                      position: "relative",
                      padding: 0,
                      backgroundColor: "none",
                    }}
                  >
                    <TabsWrapperStyle>
                      <Tabs
                        value={currentTab}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={(e, value) => handleChangeTab(value)}
                      >
                        {PROFILE_TAB.map((tab) => (
                          <Tab
                            disableRipple
                            key={tab.value}
                            value={tab.value}
                            icon={tab.icon}
                            label={tab.value.toUpperCase()}
                            color="#fff !important"
                          />
                        ))}
                      </Tabs>
                    </TabsWrapperStyle>
                  </Card>

                  {PROFILE_TAB.map((tab) => {
                    const isMatch = tab.value === currentTab;
                    return (
                      isMatch && (
                        <Box
                          key={tab.value}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          {tab.component}
                        </Box>
                      )
                    );
                  })}
                </Box>
                {!story && (
                  <Typography variant="h6">404 Story not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
