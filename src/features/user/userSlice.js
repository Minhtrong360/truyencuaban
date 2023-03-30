import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import apiService2 from "../../app/apiService2";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: {},
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.updatedProfile = action.payload;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({
    userId,
    name,
    cover,
    gender,
    address,
    city,
    country,
    birthday,
    phoneNumber,
    aboutMe,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        cover,
        gender,
        address,
        birthday,
        phoneNumber,
        aboutMe,
        city,
        country,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      };
      if (cover instanceof File) {
        const imageUrl = await cloudinaryUpload([cover]);
        console.log("cover in updateUserProfile", imageUrl);
        data.cover = imageUrl[0];
      }
      console.log("truoc khi up len server", data);
      const response = await apiService2.put(`/users/${userId}`, data);

      dispatch(slice.actions.updateUserProfileSuccess(response.data.data));

      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService2.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users");
    dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const updateLovedStory =
  ({
    userId,

    lovedStory,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        lovedStory,
      };

      console.log("truoc khi up len server", data);
      const response = await apiService2.put(
        `/users/${userId}/lovedStory`,
        data
      );

      dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
