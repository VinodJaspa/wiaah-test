import React from "react";
import { useField, useFormikContext } from "formik";

import { errorToast } from "utils";

interface FilePreview {
  url: string;
  type: "image" | "video";
  id: string;
}

interface ImageVidoeUploaderProps {
  name: "images" | "videos"; // formik field name
  type?: "image" | "video";
  maxCount: number;
}
interface FormValues {
  images: FilePreview[];
  videos: FilePreview[];

}
export default function ImageVidoeUploader({ name, type = "image", maxCount }: ImageVidoeUploaderProps) {
  const { values, setFieldValue  } = useFormikContext<FormValues>();
  const [field, meta] = useField(name);

  // Get current items from form state dynamically
  const currentItems = values[name] as FilePreview[];

  const acceptTypes =
    type === "video"
      ? "video/mp4,video/webm,video/ogg"
      : type === "image"
        ? "image/png,image/jpeg,image/jpg,image/bmp,image/tiff"
        : "image/*,video/*";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = maxCount - currentItems.length;
    if (remainingSlots <= 0) {
      errorToast(`You have reached the maximum of ${maxCount} ${type} files.`);
      e.target.value = "";
      return;
    }

    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newItems: FilePreview[] = filesToAdd.map((file) => {
      const url = URL.createObjectURL(file);
      const fileType = file.type.startsWith("video") ? "video" : "image";
      return { url, type: fileType, id: url };
    });

    setFieldValue(name, [...currentItems, ...newItems]);
    e.target.value = "";
  };

  const handleRemove = (id: string) => {
    const updated = currentItems.filter((item) => item.id !== id);
    setFieldValue(name, updated);
  };

  return (
    <div className="w-full border border-dashed border-gray-400 p-6 rounded-md mb-20">
      {currentItems.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {currentItems.map(({ url, type, id }) => (
            <div
              key={id}
              className="relative rounded-lg overflow-hidden border border-gray-300 shadow-sm"
            >
              <button
                type="button"
                onClick={() => handleRemove(id)}
                className="absolute top-1 right-1 z-20 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-md"
                aria-label="Remove file"
              >
                ✕
              </button>

              {type === "image" ? (
                <img src={url} alt="Preview" className="w-full h-32 object-cover" draggable={false} />
              ) : (
                <video src={url} controls className="w-full h-32 object-cover bg-black" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500">
        <label className="cursor-pointer block">
          <p className="text-sm mb-1">{`Drag and drop ${type} files here`}</p>
          <p className="text-sm text-gray-500 mb-2">Or click to select files</p>
          <input
         
            type="file"
            accept={acceptTypes}
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        
        </label>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-600 text-sm">{meta.error}</div>
      )}
      
    </div>
  );
}
