import React from "react";
import { useTranslation } from "react-i18next";
import {
  useNewMessage,
  useUserData,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  CloseIcon,
  HStack,
  Input,
  Radio,
  Spinner,
} from "ui";
import { useQuery } from "react-query";
import { ChatNewMessageUserInfo } from "types";

const suggestedUsersPH: ChatNewMessageUserInfo[] = [
  {
    id: "1",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop.jpeg",
    username: "username",
  },
  {
    id: "2",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-2.jpeg",
    username: "username",
  },
  {
    id: "3",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "username",
  },
  {
    id: "4",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop.jpeg",
    username: "username",
  },
  {
    id: "5",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-2.jpeg",
    username: "username",
  },
  {
    id: "6",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "username",
  },
];

async function getSuggestedUsers({
  queryKey,
}: any): Promise<ChatNewMessageUserInfo[]> {
  return suggestedUsersPH;
}

export const NewMessageModal: React.FC = () => {
  const { user } = useUserData();
  const { closeModal, isOpen } = useNewMessage();
  const { t } = useTranslation();
  const [suggestedUserSelect, setSuggestedUserSelect] =
    React.useState<string>("");
  const {
    data: suggestedUsers,
    isLoading,
    isError,
  } = useQuery(
    ["NewMessageSuggestedUsers", { userId: user?.id }],
    getSuggestedUsers,
    {
      enabled: !!user,
    }
  );

  if (!user) return null;

  return (
    <Modal onOpen={() => {}} isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent className="h-full rounded-xl">
        <ModalHeader title="" className="flex items-center justify-between">
          <CloseIcon
            className="text-4xl"
            aria-label={t("close_new_message_modal", "close new message modal")}
            onClick={closeModal}
          />
          <p className="text-[1.2em] font-bold">
            {t("new_message", "New Message")}
          </p>
          <p className="text-primary">{t("next", "Next")}</p>
        </ModalHeader>
        <div className="thinScroll h-full overflow-scroll text-xl">
          <HStack className="pl-8 h-20 border-[1px] border-gray-400">
            <p className="font-bold">{t("to", "To")}:</p>
            <Input
              className="h-full text-xl border-none"
              placeholder={`${t("search", "Search")}...`}
            />
          </HStack>
          {/* <RadioGroup
            onChange={setSuggestedUserSelect}
            value={suggestedUserSelect}
          > */}
          <div className="flex py-2 gap-4 px-8 flex-col">
            <p className="my-2 font-bold">{t("suggested", "Suggested")}</p>
            <div className="flex gap-4 flex-col">
              {isLoading ? (
                <Spinner />
              ) : (
                suggestedUsers &&
                suggestedUsers.map((user, i) => (
                  <HStack className="w-full justify-between">
                    <HStack>
                      <Avatar
                        name={user.username}
                        src={user.userPhoto}
                        key={i}
                      />
                      <div className="flex flex-col justify-between gap-0 items-start h-full">
                        <p className="font-bold">{user.username}</p>
                      </div>
                    </HStack>
                    <Radio
                      type="radio"
                      value={user.id}
                      name="suggesetUsers"
                      onChange={() => setSuggestedUserSelect(user.id)}
                    />
                  </HStack>
                ))
              )}
            </div>
          </div>
          {/* </RadioGroup> */}
        </div>
      </ModalContent>
    </Modal>
  );
};
