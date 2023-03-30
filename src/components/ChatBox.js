import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import CommentForm from "../features/comment/CommentForm";
import CommentList from "../features/comment/CommentList";

const ChatBoxWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",

  position: "absolute",
  right: "-80px",
  bottom: "120px",

  height: "565px", // set the height to 565px
  width: "325px", // set the width to 375px
  padding: theme.spacing(2),
  zIndex: 5,
  "& form": {
    marginTop: "auto", // Push the form to the bottom
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

const ChatBox = ({ chapterId }) => {
  return (
    <ChatBoxWrapper elevation={3}>
      <Box sx={{ height: "100%", overflowY: "scroll" }}>
        <CommentList chapterId={chapterId} />
      </Box>
      <br />
      <CommentForm chapterId={chapterId} />
    </ChatBoxWrapper>
  );
};

export default ChatBox;
