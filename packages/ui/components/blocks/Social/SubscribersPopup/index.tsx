import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Text,
  Icon,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { MdClose } from "react-icons/md";
import { SubscribersUsersPlaceholder } from "ui/placeholder/social";
import { SubscribersList } from "ui";

export interface SubscribersPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const SubscribersPopup: React.FC<SubscribersPopupProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {""}
            <Flex align={"center"} w="100%" justify={"space-between"}>
              <Text visibility={"hidden"}>.</Text>
              <Text
                fontWeight={"semibold"}
                fontSize="xl"
                textTransform={"capitalize"}
              >
                {title}
              </Text>
              <Icon
                onClick={onClose}
                cursor={"pointer"}
                fontSize={"1.5rem"}
                as={MdClose}
              />
            </Flex>
          </ModalHeader>
          {/* <ModalCloseButton />  */}
          <ModalBody maxH={"40rem"} p="0.25rem">
            <SubscribersList
              onClose={onClose}
              users={SubscribersUsersPlaceholder}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
