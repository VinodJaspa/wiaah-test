import { ChevronLeftIcon } from "@chakra-ui/icons/src/ChevronLeft";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import React from "react";
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
    console.log("fun open");
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
      console.log("recording started");
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
      <ModalContent bg="transparent" maxW={"80%"} p="0px">
        <ModalBody
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          p="0px"
        >
          <Flex
            justify={"center"}
            align="center"
            position={"relative"}
            direction={"column"}
          >
            <IconButton
              aria-label="Cancel Taking Picture"
              variant={"icon"}
              w="3rem"
              bg="blackAlpha.300"
              color="white"
              position={"absolute"}
              top="1rem"
              left="1rem"
              onClick={onClose}
              as={ChevronLeftIcon}
            />
            <Box position={"relative"} h={"100%"}>
              <video
                style={{ height: "80vh", maxWidth: "auto" }}
                ref={vidRef}
              />
              <Box
                borderWidth={"5px"}
                borderColor="white"
                rounded={"full"}
                p="0.25rem"
                position={"absolute"}
                bottom="2rem"
                left="50%"
                transform={"auto"}
                translateX="-50%"
              >
                <Button
                  onClick={
                    recording ? handleStopRecording : handleStartRecording
                  }
                  rounded={"full"}
                  colorScheme="whiteAlpha"
                  bgColor={recording ? "red" : "white"}
                  h="4rem"
                  w="4rem"
                >
                  <Icon
                    aria-label="take photo"
                    color={recording ? "white" : "black"}
                    as={HiCamera}
                    fontSize="xx-large"
                  />
                </Button>
              </Box>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
