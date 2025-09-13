"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { HiCamera, HiFolderAdd, HiVideoCamera, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { getFileSrcData, FileRes } from "utils";
import { TakePictureModal } from "../TakePictureModal";
import { RecordVideoModal } from "../RecordVideoModal";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";

export type MediaUploadType = "image" | "video";

interface MediaUploadModalProps {
  uploadType?: MediaUploadType;
  cancelUpload: () => void;
  onImgUpload?: (converted: FileRes, raw?: File, getBlob?: () => Blob | undefined) => any;
  onVidUpload?: (converted: string, raw?: File, getBlob?: () => Blob | undefined) => any;
  multiple?: boolean;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  uploadType,
  cancelUpload,
  onImgUpload,
  onVidUpload,
  multiple
}) => {
  const { t } = useTranslation();
  const [takePicture, setTakePicture] = useState(false);
  const [recordVideo, setRecordVideo] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const uploadImg = uploadType === "image";
  const uploadVid = uploadType === "video";

  useEffect(() => {
    setImagePreviews(imageFiles.map((file) => URL.createObjectURL(file)));
  }, [imageFiles]);

  useEffect(() => {
    setVideoPreviews(videoFiles.map((file) => URL.createObjectURL(file)));
  }, [videoFiles]);

  function addImageFiles(imgs: FileList | null) {
    if (!imgs) return;
    setImageFiles((state) => [...state, ...Array.from(imgs)]);
  }

  function addVideoFiles(vids: FileList | null) {
    if (!vids) return;
    setVideoFiles((state) => [...state, ...Array.from(vids)]);
  }

  function removeImage(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function removeVideo(index: number) {
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function confirmUpload() {
    if (uploadImg && imageFiles.length > 0) {
      imageFiles.forEach((img) => {
        getFileSrcData(img, (res) => {
          onImgUpload?.(res, img, () => new Blob([img], { type: img.type }));
        });
      });
    }
    if (uploadVid && videoFiles.length > 0) {
      videoFiles.forEach((vid) => {
        const vidSrc = URL.createObjectURL(vid);
        onVidUpload?.(vidSrc, vid, () => new Blob([vid], { type: vid.type }));
      });
    }
    cancelUpload();
  }

  const UploadTile = ({
    icon,
    inputId,
    accept,
    onChange,
    onClick
  }: any) => (
    <>
      <label htmlFor={inputId}>
        <div className="cursor-pointer flex justify-center items-center h-36 w-36 rounded-xl shadow-md border-2 border-primary bg-gradient-to-br from-blue-50 to-purple-50 hover:scale-105 hover:shadow-xl transition-all duration-300">
          {icon}
        </div>
        <input
          className="hidden"
          id={inputId}
          type="file"
          multiple={multiple}
          onChange={onChange}
          accept={accept}
        />
      </label>
      {onClick && (
        <div
          onClick={onClick}
          className="h-36 w-36 rounded-xl shadow-md border-2 border-primary bg-gradient-to-br from-pink-50 to-orange-50 flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {icon}
        </div>
      )}
    </>
  );

  return (
    <Transition appear show={!!uploadType} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={cancelUpload}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-[50rem] w-full rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium">
                  {uploadImg
                    ? t("upload_a_picture", "Upload a Picture")
                    : uploadVid
                      ? t("upload_a_video", "Upload a Video")
                      : ""}
                </Dialog.Title>

                <div className="flex flex-wrap gap-6 mt-6 justify-center">
                  {/* Image Previews */}
                  {uploadImg && imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                          <img src={src} alt="preview" className="w-full h-40 object-cover" />
                          <button
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-black/70"
                          >
                            <HiX className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Video Previews */}
                  {uploadVid && videoPreviews.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      {videoPreviews.map((src, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                          <video src={src} controls className="w-full rounded-lg" />
                          <button
                            onClick={() => removeVideo(idx)}
                            className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-black/70"
                          >
                            <HiX className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Buttons */}
                  {uploadImg && (
                    <>
                      <TakePictureModal
                        onOpen={() => setTakePicture(true)}
                        isOpen={takePicture}
                        onClose={() => setTakePicture(false)}
                        onImgCapture={(src, raw) => {
                          setTakePicture(false);
                          if (raw) setImageFiles((prev) => [...prev, raw]);
                        }}
                      />
                      <UploadTile
                        icon={<HiFolderAdd className="text-4xl text-primary" />}
                        inputId="AddImageInput"
                        accept="image/*"
                        onChange={(e: any) => addImageFiles(e.target.files)}
                      />
                      <div
                        onClick={() => setTakePicture(true)}
                        className="h-36 w-36 rounded-xl shadow-md border-2 border-primary bg-gradient-to-br from-green-50 to-teal-50 flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
                      >
                        <HiCamera className="text-primary text-4xl" />
                      </div>
                    </>
                  )}

                  {uploadVid && (
                    <>
                      <RecordVideoModal
                        onOpen={() => setRecordVideo(true)}
                        isOpen={recordVideo}
                        onVideoRecored={(vid) => {
                          setVideoFiles([new File([vid], `record.mp4`, { type: "video/mp4" })]);
                        }}
                        onClose={() => setRecordVideo(false)}
                      />
                      <UploadTile
                        icon={<HiFolderAdd className="text-4xl text-primary" />}
                        inputId="AddVideoInput"
                        accept="video/*"
                        onChange={(e: any) => addVideoFiles(e.target.files)}
                      />
                      <div
                        onClick={() => setRecordVideo(true)}
                        className="h-36 w-36 rounded-xl shadow-md border-2 border-primary bg-gradient-to-br from-yellow-50 to-red-50 flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
                      >
                        <HiVideoCamera className="text-primary text-4xl" />
                      </div>
                    </>
                  )}
                </div>

                {(imagePreviews.length > 0 || videoPreviews.length > 0) && (
                  <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                    <PrimaryButton
                      onClick={cancelUpload}
                      className="bg-gray-200 hover:bg-red-500 px-4 py-2 rounded-md transition-all duration-200 text-gray-800"
                    >
                      {t("cancel", "Cancel")}
                    </PrimaryButton>

                    <PrimaryButton
                      onClick={confirmUpload}

                    >
                      {t("continue", "Continue")}
                    </PrimaryButton>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
