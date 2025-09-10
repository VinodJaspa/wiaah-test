import * as Yup from "yup";

export const shopPresentationSchema = Yup.object().shape({
 name: Yup.string().required("Shop name is required"),
 description: Yup.string().required("Description is required"),

  images: Yup.array()
    .of(
      Yup.object({
        url: Yup.string().required("Image URL is required"),
        type: Yup.string()
          .oneOf(["image", "video"], "Type must be 'image' or 'video'")
          .required("Type is required"),
        id: Yup.string().required("ID is required"),
      })
    )
    .min(1, "At least one image is required")
    .max(3, "You can upload up to 3 images"),

  videos: Yup.array()
    .of(
      Yup.object({
        url: Yup.string().required("URL is required"),
        type: Yup.string()
          .oneOf(["image", "video"], "Type must be 'image' or 'video'")
          .required("Type is required"),
        id: Yup.string().required("ID is required"),
      })
    )
    .min(1, "At least one video is required")
    .max(1, "You can upload up to 1 video"),
});
