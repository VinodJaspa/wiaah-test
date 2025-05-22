import { Button, Divider } from "@partials";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const PhotoUploader = ({imageSrc , setImageSrc,handleChange}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Handle file selection
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Pass the file object directly, not the base64 string
      handleChange("photo", file);
      
      // Optionally, show a preview with base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  // Handle webcam capture
  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for video to load

      canvas.width = 640;
      canvas.height = 480;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");

      setImageSrc(imageData);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Webcam access denied", error);
    }
  };

  return (
    <div className="w-full justify-center px-4 lg:w-full">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Upload Photo */}
      <div className="flex flex-col items-center cursor-pointer justify-center">
        <Button className="w-[min(100%,15rem)] rounded-full" onClick={handleUploadClick}>
          {t("Upload_a_photo", "Upload a photo")}
        </Button>
        <div className="hidden text-center text-gray-500 lg:block">
          {t("From_your_computer", "From your computer")}
        </div>
      </div>
      <Divider className="my-4" />
      {/* Take Photo */}
      <div className="w-full flex flex-col items-center cursor-pointer justify-center">
        <Button className="w-[min(100%,15rem)] rounded-full" onClick={handleTakePhoto}>
          {t("Take_a_Photo", "Take a Photo")}
        </Button>
        <div className="hidden text-center text-gray-500 lg:block">
          {t("with your webcam", "with your webcam")}
        </div>
      </div>
    
    </div>
  );
};

export default PhotoUploader;
