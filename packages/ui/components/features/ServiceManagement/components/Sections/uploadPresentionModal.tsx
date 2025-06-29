"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

export const ImageUploadModal = ({
  isOpen,
  onClose,
  onUpload,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}) => {
  const [image, setImage] = useState<{ preview: string; raw: File | null }>({
    preview: "",
    raw: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImage({ preview: previewUrl, raw: file });
    }
  };

  const handleUpload = () => {
    if (image.raw) {
      onUpload(image.raw);
      onClose();
      setImage({ preview: "", raw: null });
    }
  };

  const handleRemove = () => {
    setImage({ preview: "", raw: null });
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload Images
        </h2>

        {/* Image Preview */}
        <div
          className="w-56 h-56 mx-auto border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center relative cursor-pointer hover:bg-[#f5f6f7] transition"
          onClick={() => fileInputRef.current?.click()}
        >
          {image.preview ? (
            <>
              <img
                src={image.preview}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 bg-white text-red-600 p-1 rounded-full shadow hover:bg-red-50"
              >
                <FiTrash2 />
              </button>
            </>
          ) : (
            <span className="text-gray-400 font-medium text-sm text-center">
              Click to upload from files
            </span>
          )}
        </div>

        {/* File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImage}
        />

        {/* Camera Button */}
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="mt-4 w-full px-4 py-2 border border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition"
        >
          <div className="flex items-center justify-center gap-2">
            <FiCamera />
            Take Photo with Camera
          </div>
        </button>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!image.raw}
          className="mt-3 w-full px-4 py-2 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
         Upload
        </button>
      </div>
    </div>
  );
};
