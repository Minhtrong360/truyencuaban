import { IconButton, Stack, Typography } from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateReactionComment } from "./commentSlice";

function CommentReaction({ comment }) {
  const dispatch = useDispatch();
  // toask: lam sao de hien reaction lien`
  // toanswer:  viết 1 hàm chứa data ảo để cập nhật lượt like trên FE
  const handleClick = (emoji) => {
    dispatch(updateReactionComment({ commentId: comment._id, emoji }));
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleClick("like")}
        sx={{ color: "primary.main" }}
      >
        <ThumbUpRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2" mr={1}>
        {comment?.reactions?.like}
      </Typography>

      <IconButton
        onClick={() => handleClick("disLike")}
        sx={{ color: "error.main" }}
      >
        <ThumbDownAltRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">{comment?.reactions?.disLike}</Typography>
    </Stack>
  );
}

export default CommentReaction;
