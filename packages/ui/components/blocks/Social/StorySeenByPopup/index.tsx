import React from "react";
import {
  Avatar,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Input,
  HStack,
  Button,
} from "@partials";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { StorySeenByUserInfo } from "types";
import { useTypedReactPubsub } from "@libs";

export interface StorySeenByPopupProps {
  users: StorySeenByUserInfo[] | null;
  onSearch: (term: string) => any;
  searchTerm: string;
}

export const useStorySeenByPopup = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (k) => k.openSocialStoryViewersModal
  );

  React.useEffect(() => removeListner, []);

  function open(storyId: string) {
    emit({ storyId });
  }

  function close() {
    emit({ storyId: null });
  }

  return {
    open,
    close,
    listen: Listen,
  };
};

export const StorySeenByPopup: React.FC<StorySeenByPopupProps> = ({
  onSearch,
  users,
  searchTerm = "",
}) => {
  const { close } = useStorySeenByPopup();
  const { t } = useTranslation();
  console.log("users", users);
  return (
    <Modal
      onClose={() => {
        console.log("close");
        close();
      }}
      isOpen={!!users}
    >
      <ModalOverlay />
      <ModalContent>
        <div className="flex justify-between">
          <p>{t("People who have seen this story")}</p>
          <MdClose
            data-testid="CloseModalBtn"
            className="cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          <Input
            data-testid="SearchUserInput"
            value={searchTerm}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            flushed
            placeholder={t("search")}
          />
          <div
            className="flex gap-4 max-h-[30rem] overflow-y-scroll flex-col thinScroll"
            data-testid="UsersListContainer"
          >
            {users
              ? users.map((user, i) => (
                  <HStack
                    data-testid="UserCard"
                    className="text-lg justify-between"
                    key={i}
                  >
                    <HStack>
                      <Avatar name={user.name} photoSrc={user.photoSrc} />
                      <p data-testid="Username">{user.name}</p>
                    </HStack>
                    <Button>{t("Follow")}</Button>
                  </HStack>
                ))
              : null}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
