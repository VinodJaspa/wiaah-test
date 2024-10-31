import { Modal, ModalContent } from "@UI";
import { useModalDisclouser } from "hooks";
import { cn } from "utils/src";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdClose } from "react-icons/md";

interface MoreOptionsPopupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MoreOptionsPopup: React.FC<MoreOptionsPopupProps> = ({
  className,
  ...props
}) => {
  const { isOpen, handleOpen, handleClose } = useModalDisclouser();

  // Define button data with individual click handlers
  const buttons = [
    {
      label: "REPORT",
      color: "text-red-500",
      handleClick: () => {
        console.log("REPORT");
        handleClose(); // Optional: close the modal after logging
      },
    },
    {
      label: "BLOCK",
      color: "text-red-500",
      handleClick: () => {
        console.log("BLOCK");
        handleClose();
      },
    },
    {
      label: "SHARE",
      color: "text-gray-900",
      handleClick: () => {
        console.log("SHARE");
      },
    },
    {
      label: "COPY URL",
      color: "text-gray-900",
      handleClick: () => {
        console.log("COPY URL");
        handleClose();
      },
    },
    {
      label: "HIDE ALL POSTS",
      color: "text-gray-900",
      handleClick: () => {
        console.log("HIDE ALL POSTS");
        handleClose();
      },
    },
  ];

  return (
    <div className={cn("flex cursor-pointer", className)} {...props}>
      <Modal onOpen={() => {}} onClose={handleClose} isOpen={isOpen}>
        <ModalContent className="h-screen w-screen bg-opacity-80 bg-black flex justify-center items-center">
          <div className="relative flex flex-col bg-white rounded-lg shadow-lg justify-center items-center p-8 max-w-xs divide-y  divide-gray-300  first:divide-transparent">
            <MdClose
              onClick={handleClose}
              className="absolute -top-2 -right-16 text-3xl w-9 h-9 cursor-pointer text-white z-30"
              aria-label="Close Post"
            />
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`${button.color} py-2 w-full text-left font-semibold text-xl`}
                onClick={button.handleClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        </ModalContent>
      </Modal>
      <HiDotsVertical
        className="w-6 h-6 justify-center items-center"
        onClick={handleOpen}
      />
    </div>
  );
};
