import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalProps,
  ArrowLeftIcon,
  Button,
} from "@UI";
import { HiCamera } from "react-icons/hi";

export interface RecordVideoModalProps extends Omit<ModalProps, "children"> {
  onVideoRecored?: (RecoredVideoBlob: Blob) => any;
}

export const RecordVideoModal: React.FC<RecordVideoModalProps> = ({
  onVideoRecored,
  isOpen,
  onClose,
  ...props
}) => {
  const vidRef = React.useRef<HTMLVideoElement>(null);
  const [recording, setRecording] = React.useState<boolean>(false);
  const [vidBlobs, setVidBlobs] = React.useState<Blob[]>([]);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] =
    React.useState<MediaRecorder | null>(null);

  async function getUserCameraStrem() {
    if (
      navigator &&
      navigator.mediaDevices &&
      vidRef &&
      vidRef.current &&
      window
    ) {
      try {
        if (isOpen) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setStream(stream);

          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm",
          });
          setMediaRecorder(mediaRecorder);

          if (vidRef.current) {
            vidRef.current.srcObject = stream;
            vidRef.current.play();
          }
        } else if (stream && !isOpen) {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (error) {
        console.error("camera errors", error);
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
  }, [isOpen, navigator, vidRef]);

  const handleStartRecording = () => {
    try {
      if (!stream || !mediaRecorder) return;
      setRecording(true);

      mediaRecorder.ondataavailable = (event) => {
        setVidBlobs((oldBlobs) => [...oldBlobs, event.data]);
      };

      mediaRecorder.start(1000);
    } catch (error) {
      console.error("recording error", error);
    }
  };

  console.log(recording, "test");
  const handleStopRecording = () => {
    try {
      if (!mediaRecorder) return;
      setRecording(false);
      mediaRecorder.stop();
      const videoData = new Blob(vidBlobs, { type: "video/webm" });
      setVidBlobs([]);
      onVideoRecored && onVideoRecored(videoData);
      onClose();
    } catch (err) {
      console.error("stop recording error", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent className="bg-transparent max-w-[80%] p-0">
        <div className="flex justify-center items-center p-0">
          <div className="flex justify-center items-center relative flex-col">
            <ArrowLeftIcon
              className="w-12 bg-black bg-opacity-30 text-white absolute top-4 left-4"
              aria-label="Cancel Taking Picture"
              onClick={onClose}
            />
            <div className="relative w-full">
              <video
                style={{ height: "80vh", maxWidth: "auto" }}
                ref={vidRef}
              />
              <div className="border-[5px] border-white rounded-full p-1 absolute bottom-4 left-1/2 -translate-x-1/2 transform">
                <Button
                  onClick={
                    recording ? handleStopRecording : handleStartRecording
                  }
                  className="rounded-full w-16 h-16"
                  style={{
                    backgroundColor: recording ? "red" : "white",
                  }}
                  colorScheme="white"
                >
                  <HiCamera
                    style={{
                      color: recording ? "white" : "black",
                    }}
                    className="text-4xl"
                    aria-label="take photo"
                    color={recording ? "white" : "black"}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
