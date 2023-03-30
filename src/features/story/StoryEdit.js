import React, { useCallback } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { fData } from "../../utils/numberFormat";
import { useDispatch } from "react-redux";
import { updateStory } from "./storySlice";

const UpdateStorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  authorName: yup.string().required("Author's name is required"),
  genres: yup.string().required("Genres is required"),
  // cover: yup.string().required("Avatar is required"),
  summarize: yup.string().required("Summarize is required"),
});

function StoryEdit({ story, isLoading }) {
  const defaultValues = {
    title: story?.title || "",
    authorName: story?.authorName || "",
    artist: story?.artist || "",
    genres: story?.genres || "",
    minimumAge: story?.minimumAge || "",
    summarize: story?.summarize || "",
    cover: story?.cover[0] || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateStorySchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "cover",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(updateStory({ storyId: story._id }, { data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} width="100vh">
        <Grid item xs={12} md={4}>
          <Card
            sx={{ py: 10, px: 3, textAlign: "center", justifyItems: "center" }}
          >
            <FUploadAvatar
              name="cover"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                    justifyItems: "center",
                  }}
                >
                  Cho phép *.jpeg, *.jpg, *.png, *.gif
                  <br /> kích thước tối đa {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 10,
              }}
            >
              <FTextField name="title" label="Tiêu đề" />
              <FTextField name="authorName" label="Tác giả" />

              <FTextField name="artist" label="Họa sĩ" />
              <FTextField name="genres" label="Thể loại" />

              <FTextField name="minimumAge" label="Tuổi tối thiểu" />
              <FTextField
                name="summarize"
                multiline
                rows={4}
                label="Giới thiệu"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                mt: 3,
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Lưu lại
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default StoryEdit;
