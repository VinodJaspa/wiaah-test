import { useState } from "react";

export function useMediaUploadControls() {
  const [uploadType, setUploadType] = useState<"image" | "video" | undefined>(undefined);
  const [files, setFiles] = useState<File[]>([]);

  const controls = {
    uploadType,
    cancelUpload: () => setUploadType(undefined),
  };

  // For triggering image upload modal
  const uploadImage = () => {
    setUploadType("image");
  };

  // For triggering video upload modal
  const uploadVideo = () => {
    setUploadType("video");
  };

  // When files are uploaded
  const handleImgUpload = (converted: any, raw?: File) => {
    if (raw) {
      setFiles((prev) => [...prev, raw]);
    }
  };

  const handleVidUpload = (converted: string, raw?: File) => {
    if (raw) {
      setFiles((prev) => [...prev, raw]);
    }
  };

  return {
    controls,
    uploadImage,
    uploadVideo,
    files,
    handleImgUpload,
    handleVidUpload,
  };
}
