import React from "react";
import {
  Avatar,
  Modal,
  ModalContent,
  ModalOverlay,
  Input,
  HStack,
  Button,
} from "@partials";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import { useTypedReactPubsub } from "@libs";
import { useGetMyStoryViewers } from "@features/Social";
import { usePaginationControls } from "@blocks/Navigating";

export interface StorySeenByPopupProps {}

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

export const StorySeenByPopup: React.FC<StorySeenByPopupProps> = () => {
  const { close, listen } = useStorySeenByPopup();
  const { t } = useTranslation();
  const [storyId, setStoryId] = React.useState<string>();
  const [search, setSearch] = React.useState<string>();
  const { controls, pagination } = usePaginationControls();

  listen((props) => {
    if (props && props["id"]) {
      setStoryId(props["id"]);
    }
  });

  const { data: users } = useGetMyStoryViewers({
    pagination,
    storyId: storyId || "",
    q: search,
  });

  return (
    <Modal
      onClose={() => {
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                      <Avatar
                        name={user.viewer?.profile?.username}
                        photoSrc={user.viewer?.profile?.photo}
                      />
                      <p data-testid="Username">
                        {user.viewer?.profile?.username}
                      </p>
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
