import React, { useCallback, useEffect } from "react";
import { Box, Grid, Card, Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  FTextField,
  FUploadAvatar,
  FSelect,
} from "../../components/form";
import { fData } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../user/userSlice";
import LoadingScreen from "../../components/LoadingScreen";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountGeneral() {
  const { user } = useAuth();

  // useEffect(() => {
  //   console.log("useAuth", user);
  // }, [user]);

  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    cover: user?.cover || "",
    gender: user?.gender || "Male",
    birthday: user?.birthday?.slice(0, 10) || "",
    // timeRegister: user?.subscription?.isSubscription
    //   ? user?.subscription?.subscription[0]?.timeRegister?.slice(0, 10)
    //   : "",
    expired: user?.subscription?.isSubscription
      ? user?.subscription?.subscription[0]?.expired?.slice(0, 10)
      : "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    phoneNumber: user?.phoneNumber || "",
    aboutMe: user?.aboutMe || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  Object.keys(defaultValues).map((key) => {
    return setValue(key, defaultValues[key]);
  });

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const contentFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue("cover", contentFiles[0]);
    },
    [setValue, methods]
  );

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!user && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
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
                    }}
                  >
                    Cho phép *.jpeg, *.jpg, *.png, *.gif
                    <br /> kích thước tối đa {fData(3145728)}
                  </Typography>
                }
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="name" label="Tên" />
                <FTextField name="email" label="Email" disabled />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FSelect {...field} label="Giới tính">
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Undefined">Không xác định</option>
                    </FSelect>
                  )}
                />
                <FTextField
                  name="birthday"
                  label="Ngày sinh"
                  type="date"
                  placeholder=""
                />

                <FTextField
                  name="expired"
                  label="Ngày hết hạn đăng ký"
                  placeholder=""
                  disabled
                />

                <FTextField name="address" label="Địa chỉ" />
                <FTextField name="city" label="Thành phố / Tỉnh" />
                <FTextField name="country" label="Đất nước" />
                <FTextField name="phoneNumber" label="Số điện thoại" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <FTextField name="aboutMe" multiline rows={4} label="Mô tả" />

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Lưu thay đổi
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
      {!user && <LoadingScreen />}
    </FormProvider>
  );
}

export default AccountGeneral;
