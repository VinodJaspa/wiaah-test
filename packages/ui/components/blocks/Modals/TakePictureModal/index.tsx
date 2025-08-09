import {
  ArrowLeftIcon,
  Button,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Modal,
} from "../../../partials";
import React from "react";
import { HiCamera } from "react-icons/hi";

export interface CameraPreviewProps extends Omit<ModalProps, "children"> {
  onImgCapture?: (imgDataUrl: string, fileConverted?: File) => any;
}
export const TakePictureModal: React.FC<CameraPreviewProps> = ({
  onClose,
  onImgCapture,
  isOpen,
  ...props
}) => {
  const vidRef = React.useRef<HTMLVideoElement>(null);
  const canvRef = React.useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  React.useEffect(() => {
    async function startCamera() {
      if (!isOpen) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        streamRef.current = stream;

        if (vidRef.current) {
          vidRef.current.srcObject = stream;
          vidRef.current.play();
        }

        if (canvRef.current) {
          setCtx(canvRef.current.getContext("2d"));
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }

    startCamera();

    // Cleanup function to stop the camera when modal closes or component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleTakePicture = () => {
    try {
      if (ctx && vidRef.current && canvRef.current) {
        const canvas = canvRef.current;
        canvas.width = vidRef.current.videoWidth;
        canvas.height = vidRef.current.videoHeight;
        ctx.drawImage(vidRef.current, 0, 0, canvas.width, canvas.height);

        const imgSrc = canvas.toDataURL("image/jpeg");
        const toFile = new File(
          [new Blob([imgSrc], { type: "image/jpeg" })],
          `${new Date().toISOString()}.jpeg`,
          { type: "image/jpeg" }
        );

        if (onImgCapture) onImgCapture(imgSrc, toFile);

        stopCamera(); // Stop camera after capture
        onClose();    // Close modal
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        stopCamera();
        onClose();
      }}
      {...props}
    >
      <ModalOverlay />
      <ModalContent className="bg-transparent max-w-[80%] p-0">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center relative flex-col">
            <ArrowLeftIcon
              aria-label="Cancel Taking Picture"
              className="w-12 bg-black bg-opacity-30 text-white absolute top-4 left-4 cursor-pointer"
              onClick={() => {
                stopCamera();
                onClose();
              }}
            />
            <div className="relative h-full">
              <video
                style={{ height: "80vh", maxWidth: "auto" }}
                ref={vidRef}
                muted
                autoPlay
                playsInline
              />
              <Button
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full bg-primary h-16 w-16"
                onClick={handleTakePicture}
              >
                <HiCamera aria-label="take photo" className="text-4xl" />
              </Button>
            </div>
            <canvas style={{ display: "none" }} ref={canvRef} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

