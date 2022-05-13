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
              // fontSize="xx-large"
              onClick={onClose}
              as={ChevronLeftIcon}
            />
            <Box position={"relative"} h={"100%"}>
              <video
                style={{ height: "80vh", maxWidth: "auto" }}
                ref={vidRef}
              />
              <Button
                position={"absolute"}
                bottom="2rem"
                left="50%"
                onClick={handleTakePicture}
                transform={"auto"}
                translateX="-50%"
                rounded={"full"}
                bg="primary.main"
                h="4rem"
                w="4rem"
              >
                <Icon
                  aria-label="take photo"
                  as={HiCamera}
                  fontSize="xx-large"
                />
              </Button>
            </Box>
            <canvas style={{ display: "none" }} ref={canvRef} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
