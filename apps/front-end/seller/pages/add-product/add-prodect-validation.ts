import * as Yup from "yup";
const translationSchema = Yup.object({
    langId: Yup.string().required(),
    value: Yup.string().required("This field is required"),
  });
    const filePreviewSchema = Yup.object().shape({
    url: Yup.string().required(),
    type: Yup.string().oneOf(["image", "video"]).required(),
    id: Yup.string().required(),
    file: Yup.mixed().required("File is required"),
  });
export const productValidationSchema = Yup.object({
    type: Yup.string().required("Product type is required"),
    
    title: Yup.array()
    .of(translationSchema)
    .min(1, "At least one title is required")
    .required("Title is required"),
    description: Yup.array()
    .of(translationSchema)
    .min(1, "At least one title is required")
    .required("Description is required"),
  
    price: Yup.number()
      .typeError("Price must be a number")
      .integer("Price must be an integer")
      .min(1, "Price cannot be zero")
      .required("Price is required"),
    
    categoryId: Yup.string().required("Category is required"),
    attributesIds: Yup.array().of(Yup.string()),
  
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .min(1, "Stock cannot be zero")
      .required("Stock is required"),
    
  
  
    visibility: Yup.string().required("Visibility is required"),
  
    condition: Yup.string().required("Condition is required"),
  
    colors: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one color")
      .required("Colors are required"),
  
    sizes: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one size")
      .required("Sizes are required"),
  
    discount: Yup.object({
      units: Yup.number()
        .min(0, "Discount units cannot be negative")
        .default(0),
      amount: Yup.number()
        .min(0, "Discount amount cannot be negative")
        .max(100, "Discount cannot exceed 100%")
        .default(0),
    }),
  
    cashbackId: Yup.string().nullable(),
  
    presentations: Yup.array()
      .of(
        Yup.object({
          type: Yup.string().required(),
          src: Yup.string().url("Presentation source must be a valid URL").required(),
        })
      )
      .default([]),
  
    vat: Yup.number()
      .min(0, "VAT cannot be negative")
      .default(0),
  
    material: Yup.string().nullable(),
    gender: Yup.string().required("Gender is required"),
    productDimensions: Yup.string().nullable(),
    itemWeight: Yup.string().nullable(),
    modelNumber: Yup.string().nullable(),
    eanUpc: Yup.string().nullable(),
    // productType: Yup.string().required("Product type is required"),
    shippingSettings: Yup.string().nullable(),
    subcategoryId: Yup.string().nullable(),
    images: Yup.array()
    .of(
      Yup.object({
        url: Yup.string().required(),
        type: Yup.string().oneOf(["image", "video"]).required(),
        id: Yup.string().required(),
      })
    )
    .min(1, "At least one image is required"),
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
    .max(2, "You can upload up to 2 videos"),
  
  });
