import { toast } from "react-toastify";
import apiService2 from "../app/apiService2";

export const cloudinaryUpload = async (images) => {
  if (!images || images.length === 0) return [];

  try {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("files", image);
    });

    const response = await apiService2.post(`/api/uploadImages`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("response server gửi về khi up ảnh", response.data);
    const imageUrls = response.data.imageUrls;

    return imageUrls;
  } catch (error) {
    toast(error);
  }
};
