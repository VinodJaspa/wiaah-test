import { ChatSearchInput } from "@blocks/DataInput";
import { useSocialControls } from "@blocks/Layout";

import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { ChatNewMessageUserInfo } from "types";
import { useUserData } from "../../../../src/Hooks";
import {
  Avatar,
  CloseIcon,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "../../../partials";
import { ShadCnButton } from "@UI/components/shadcn-components";

const suggestedUsersPH: ChatNewMessageUserInfo[] = [
  {
    id: "1",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop.jpeg",
    username: "john_doe",
  },
  {
    id: "2",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-2.jpeg",
    username: "jane_smith",
  },
  {
    id: "3",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "alex_morgan",
  },
  {
    id: "4",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop.jpeg",
    username: "tumpa.rahman",
  },
  {
    id: "5",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-2.jpeg",
    username: "jenny_park",
  },
  {
    id: "6",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "rita_ora",
  },
  {
    id: "7",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "rita_ora",
  },
  {
    id: "8",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "rita_ora",
  },
  {
    id: "9",
    name: {
      first: "first",
      last: "last",
    },
    userPhoto: "/shop-3.jpeg",
    username: "rita_ora",
  },
];

async function getSuggestedUsers({
  queryKey,
}: any): Promise<ChatNewMessageUserInfo[]> {
  return suggestedUsersPH;
}

export const NewMessageModal: React.FC = () => {
  const { user } = useUserData();
  const { value: isOpen, cancelMsgNewUser } = useSocialControls("msgNewUser");
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
    },
  );

  if (!user) return null;

  return (
    <Modal isOpen={!!isOpen} onClose={cancelMsgNewUser}>
      <ModalOverlay />
      <ModalContent className="rounded-xl flex flex-col gap-y-6 p-6 min-w-[500px]">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">
            {t("new_message", "New Message")}
          </p>
          <CloseIcon
            onClick={() => cancelMsgNewUser()}
            className="text-xl cursor-pointer"
            aria-label={t("close_new_message_modal", "close new message modal")}
          />
        </div>
        <ChatSearchInput />
        <div className="thinScroll h-full overflow-y-scroll max-h-80">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              {isLoading ? (
                <Spinner />
              ) : (
                suggestedUsers &&
                suggestedUsers.map((user, i) => (
                  <HStack className="w-full justify-between cursor-pointer">
                    <HStack>
                      <Avatar
                        name={user.username}
                        src={user.userPhoto}
                        key={i}
                      />
                      <div className="flex flex-col gap-0">
                        <p className="text-lg font-semibold">{user.username}</p>
                        <p>message preview</p>
                      </div>
                    </HStack>
                  </HStack>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-4">
          <ShadCnButton onClick={() => cancelMsgNewUser()} variant="outline">
            Cancel
          </ShadCnButton>
          <ShadCnButton className="bg-grey-800 text-white border-0 hover:bg-gray-700 focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800" >
    
            Start Chat
          </ShadCnButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
