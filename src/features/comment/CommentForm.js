import React, { useState } from "react";

import { Stack, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { createComment, updateComment } from "./commentSlice";

function CommentForm({ storyId, commentID, setIsEdit, isEdit, chapterId }) {
  const { commentsById } = useSelector(
    (state) => ({
      commentsById: state.comment.commentsById,
    }),
    shallowEqual
  );

  let text = "";
  if (commentsById && commentID) {
    text = commentsById[commentID].content;
  }

  const [content, setContent] = useState(text);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      dispatch(createComment({ storyId, chapterId, content }));
      setContent("");
      return;
    }
    if (isEdit) {
      console.log("storyId in commentForm", storyId);
      console.log("chapterId in commentForm", chapterId);
      dispatch(updateComment({ content, commentID, storyId, chapterId }));
      setContent("");
      setIsEdit(false);
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="row"
        alignItems="center"
        display="flex"
        justifyContent="center"
        // width="70%"
      >
        <Avatar />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Để lại bình luận"
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
