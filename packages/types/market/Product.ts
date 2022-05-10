export type ProductDescTabs = "description" | "reviews";
export type ProductTypes = "product" | "service";
export interface ProductGalleryItem {
  original: string;
  thumbnail: string | "";
  alt?: string | "";
  type: "image" | "video";
}
