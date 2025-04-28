import { useMutation } from "react-query";

import { MdChevronLeft, MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  FloatingContainer,
  VerticalCarousel,
  ActionViewer,
  useActionViewPopup,
  useGetActionDataQuery,
  ShadcnDialog,
  ShadcnText,
} from "@UI";

import React from "react";
import { PostsViewModalsHeader } from "../../Headers";

export interface ActionViewPopupProps { }

const goNextPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) + 1) };
};

const goPrevPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) - 1) };
};

export const ActionViewModal: React.FC<ActionViewPopupProps> = ({}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
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
      <ShadcnDialog open={!!actionId} onOpenChange={handlePostViewClose} className="h-screen max-w-full bg-black flex flex-col">
        <div className="absolute top-4 left-4">

          <MdChevronLeft
            onClick={removeCurrentAction}
            className="text-white text-3xl cursor-pointer"
          />
        </div>

        <VerticalCarousel
  
    
          data-testid="VerticalCarouselContainer"
          onPassMaxLimit={handleNextPost}
          onPassMinLimit={handlePrevPost}
        >
          {[...Array(1)].map((_, i) => (
            <FloatingContainer
              // key={i}
              className="flex justify-center items-center w-full h-full overflow-hidden bg-black"
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
                <ShadcnText className="text-white bg-black p-4">Something went wrong</ShadcnText>
              )}
            </FloatingContainer>
          ))}
        </VerticalCarousel>


      </ShadcnDialog>
    </>
  );
};
