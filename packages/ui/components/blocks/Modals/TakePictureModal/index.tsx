import React from "react";
import { HiCamera } from "react-icons/hi";
import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalHeader,
  ArrowLeftIcon,
  Button,
} from "@UI";

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
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>();
  let stream: MediaStream;

  async function getUserCameraStrem() {
    console.log("fun open");
    if (
      navigator &&
      navigator.mediaDevices &&
      vidRef &&
      vidRef.current &&
      canvRef &&
      canvRef.current &&
      window
    ) {
      setCtx(canvRef.current.getContext("2d"));

      try {
        if (isOpen) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          if (vidRef.current) {
            vidRef.current.srcObject = stream;
            vidRef.current.play();
          }
        } else if (stream && !isOpen) {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (error) {
        console.log("camera errors", error);
      }
    } else {
      setTimeout(() => {
        if (isOpen) {
          getUserCameraStrem();
        }
      }, 200);
    }
  }

  React.useEffect(() => {
    getUserCameraStrem();
    console.log("open");
  }, [isOpen, navigator, vidRef, canvRef]);

  function handleTakePicture() {
    try {
      console.log("test");
      if (ctx && vidRef && vidRef.current && canvRef && canvRef.current) {
        console.log("test 1");
        const { current: canv } = canvRef;
        canv.width = vidRef.current.videoWidth;
        canv.height = vidRef.current.videoHeight;
        ctx.drawImage(
          vidRef.current,
          0,
          0,
          vidRef.current.videoWidth,
          vidRef.current.videoHeight
        );
        const imgSrc = canv.toDataURL();
        const toFile = new File(
          [new Blob([imgSrc], { type: "image/jpeg" })],
          `${new Date(Date.now()).toISOString()}`
        );
        onImgCapture && onImgCapture(imgSrc, toFile);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent className="bg-transparent max-w-[80%] p-0">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center relative flex-col">
            <ArrowLeftIcon
              aria-label="Cancel Taking Picture"
              className="w-12 bg-black bg-opacity-30 text-white absolute top-4 left-4"
              onClick={onClose}
            />
            <div className="relative h-full">
              <video
                style={{ height: "80vh", maxWidth: "auto" }}
                ref={vidRef}
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
