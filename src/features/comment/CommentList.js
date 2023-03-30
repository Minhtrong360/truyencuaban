import React, { useEffect } from "react";

import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteComment, getComments, editComment } from "./commentSlice";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";
import { COMMENTS_PER_POST } from "../../app/config";

function CommentList({ storyId, chapterId }) {
  const {
    commentsByStory,
    commentsByChapter,
    totalCommentsByStory,
    totalCommentsByChapter,
    isLoading,
    currentPageByStory,
    currentPageByChapter,
    commentsById,
  } = useSelector(
    (state) => ({
      commentsByStory: state.comment.commentsByStory[storyId],
      commentsByChapter: state.comment.commentsByChapter[chapterId],
      totalCommentsByStory: state.comment.totalCommentsByStory[storyId],
      totalCommentsByChapter: state.comment.totalCommentsByChapter[chapterId],

      currentPageByStory: state.comment.currentPageByStory[storyId] || 1,
      currentPageByChapter: state.comment.currentPageByChapter[chapterId] || 1,
      isLoading: state.comment.isLoading,
      commentsById: state.comment.commentsById,
    }),
    shallowEqual
  );

  let totalComments;
  if (commentsByStory?.length > 0) {
    totalComments = totalCommentsByStory;
  }
  if (commentsByChapter?.length > 0) {
    totalComments = totalCommentsByChapter;
  }

  const totalPages = Math.ceil(totalComments / COMMENTS_PER_POST);
  const dispatch = useDispatch();

  const onDelete = (commentId) => {
    dispatch(
      deleteComment({
        commentId: commentId,
        storyId,
        chapterId,
        page: currentPageByStory,
      })
    );
  };

  useEffect(() => {
    if ({ storyId, totalComments }) {
      dispatch(getComments({ storyId }));
    }
    if ({ chapterId, totalComments }) {
      dispatch(getComments({ chapterId }));
    }
  }, [storyId, totalComments, chapterId]);

  let renderComments;
  console.log();
  if (commentsByStory) {
    const comments = commentsByStory.map(
      (commentId) => commentsById[commentId]
    );

    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            onDelete={onDelete}
            storyId={storyId}
          />
        ))}
      </Stack>
    );
  }
  if (commentsByChapter) {
    const comments = commentsByChapter.map(
      (commentId) => commentsById[commentId]
    );

    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            onDelete={onDelete}
            chapterId={chapterId}
          />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5}>
      {commentsByStory && (
        <>
          <Stack
            direction="row"
            justifyContent="end"
            sx={{ marginBottom: 3, alignItems: "center" }}
          >
            <Typography
              variant="subtitle"
              sx={{
                color: "text.secondary",
                display: "flex",
              }}
            >
              {totalComments > 1
                ? `${totalComments} comments`
                : totalComments === 1
                ? `${totalComments} comment`
                : "No comment"}
            </Typography>
            {totalComments > COMMENTS_PER_POST && (
              <Pagination
                count={totalPages}
                page={currentPageByStory}
                onChange={(e, page) => dispatch(getComments({ storyId, page }))}
              />
            )}
          </Stack>
          {renderComments}
        </>
      )}
      {commentsByChapter && (
        <>
          {renderComments}
          <Stack
            direction="row"
            justifyContent="space-between"
            position="absolute"
            bottom="70px"
            alignItems="center"
          >
            <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
              {totalComments > 1
                ? `${totalComments} comments`
                : totalComments === 1
                ? `${totalComments} comment`
                : "No comment"}
            </Typography>
            {totalComments > COMMENTS_PER_POST && (
              <Pagination
                count={totalPages}
                page={currentPageByChapter}
                onChange={(e, page) =>
                  dispatch(getComments({ chapterId, page }))
                }
              />
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default CommentList;
