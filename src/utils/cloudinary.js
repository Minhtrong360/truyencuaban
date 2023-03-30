import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";
import { toast } from "react-toastify";

// export const cloudinaryUpload = async (image) => {
//   if (!image) return "";
//   try {
//     const formData = new FormData();
//     formData.append("file", image);
//     // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//     const response = await axios.post(
//       "http://localhost:5500/api/uploadImage",
//       formData
//     );

//     const imageUrl = response.data.imageUrl;

//     return imageUrl;
//   } catch (error) {
//     toast(error);
//   }
// };
export const cloudinaryUpload = async (images) => {
  if (!images || images.length === 0) return [];
  console.log("images in CloudinaryUpload", images);
  try {
    const formData = new FormData();
    console.log("images in CloudinaryUpload try", images);
    images.forEach((image) => {
      formData.append("files", image);
      console.log("image in CloudinaryUpload ForEach", image);
    });

    const response = await axios.post(
      "http://localhost:5500/api/uploadImages",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("imageUrls in CloudinaryUpload", response.data.imageUrls);
    const imageUrls = response.data.imageUrls;

    return imageUrls;
  } catch (error) {
    toast(error);
  }
};
