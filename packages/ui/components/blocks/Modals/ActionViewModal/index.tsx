import { useMutation } from "react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  IconButton,
  Icon,
  Text,
  ModalHeader,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  FloatingContainer,
  VerticalCarousel,
  ActionViewer,
  useActionViewPopup,
  useGetActionDataQuery,
} from "ui";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import React from "react";
import { PostsViewModalsHeader } from "../../Headers";

export interface ActionViewPopupProps {}

const goNextPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) + 1) };
};

const goPrevPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) - 1) };
};

export const ActionViewModal: React.FC<ActionViewPopupProps> = ({}) => {
  const { t } = useTranslation();
  const { actionId, setCurrentActionId, removeCurrentAction } =
    useActionViewPopup();

  const { mutate: mutateNext } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goNextPost, {
    onSuccess: (data) => {
      setCurrentActionId(data.id);
    },
  });
  const { mutate: mutatePrev } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goPrevPost, {
    onSuccess: (data) => {
      setCurrentActionId(data.id);
    },
  });

  const {
    data: action,
    isLoading,
    isError,
    error,
  } = useGetActionDataQuery(actionId || null);

  function handlePostViewClose() {
    removeCurrentAction();
  }

  function handleNextPost() {
    if (actionId) {
      mutateNext({ currentId: actionId });
    }
  }
  function handlePrevPost() {
    if (actionId) {
      mutatePrev({ currentId: actionId });
    }
  }
  return (
    <>
      <Modal
        isCentered
        onClose={handlePostViewClose}
        isOpen={!!actionId}
        motionPreset="slideInBottom"
        blockScrollOnMount={true}
        // css={{ "&& .chakra-modal__content-container": { overflow: "hidden" } }}
      >
        <ModalOverlay />
        <ModalContent overflow={"hidden"} p="0px" h="100vh" maxW={"100%"}>
          <ModalBody
            bg="black"
            p="0px"
            gap="0.5rem"
            display="flex"
            h="100%"
            w="100%"
          >
            <FloatingContainer
              items={[
                {
                  label: (
                    <Icon
                      fontSize={"xx-large"}
                      color="white"
                      as={ChevronLeftIcon}
                      onClick={removeCurrentAction}
                    />
                  ),
                  top: "1rem",
                  left: "1rem",
                },
              ]}
            >
              <VerticalCarousel
                w="100%"
                h="100%"
                overflow="hidden"
                data-testid="VerticalCarouselContainer"
                onPassMaxLimit={handleNextPost}
                onPassMinLimit={handlePrevPost}
              >
                {[...Array(1)].map((_, i) => (
                  <FloatingContainer
                    // key={i}
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                    w="100%"
                    h="100%"
                    overflow={"hidden"}
                    bg="black"
                    items={
                      [
                        // {
                        //   label: (
                        //     <IconButton
                        //       onClick={handleNextPost}
                        //       p="0rem"
                        //       fontSize={"xxx-large"}
                        //       colorScheme={"blackAlpha"}
                        //       bgColor="blackAlpha.300"
                        //       aria-label="Close Post"
                        //       icon={<Icon as={ChevronDownIcon} />}
                        //     />
                        //   ),
                        //   bottom: "2rem",
                        //   right: "0rem",
                        // },
                        // {
                        //   label: (
                        //     <IconButton
                        //       onClick={handlePrevPost}
                        //       p="0rem"
                        //       fontSize={"xxx-large"}
                        //       colorScheme={"blackAlpha"}
                        //       bgColor="blackAlpha.300"
                        //       aria-label="Close Post"
                        //       icon={<Icon as={ChevronUpIcon} />}
                        //     />
                        //   ),
                        //   top: "2rem",
                        //   right: "0rem",
                        // },
                      ]
                    }
                  >
                    {!isLoading && action ? (
                      <ActionViewer
                        dark={true}
                        interactionPos="in"
                        action={action}
                      />
                    ) : (
                      <Text bg="black" color="white">
                        something went wrong
                      </Text>
                    )}
                  </FloatingContainer>
                ))}
              </VerticalCarousel>
            </FloatingContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
