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
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";

const messages = [
  {
    id: 1,
    name: "z.beatz",
    lastMessage: "z.beatz a envoyé une pièce jointe...",
    time: "1h",
    avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=Z",
  },
  {
    id: 2,
    name: "Liam Carter",
    lastMessage: "Vous: See you tomorrow!",
    time: "1h",
    avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=L",
  },
  {
    id: 3,
    name: "Olivia Davis",
    lastMessage: "Vous: Thanks for the recommendation!",
    time: "2h",
    avatar: "https://placehold.co/40x40/f1f5f9/64748b?text=O",
  },
];




export const NewMessageModal: React.FC = () => {
  const { user } = useUserData();
  const { value: isOpen, cancelMsgNewUser, chatWith } = useSocialControls("msgNewUser");
  const { t } = useTranslation();
  const [isLoading, setLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);

  const [suggestedUserSelect, setSuggestedUserSelect] =
    React.useState<string>("");
  // const {
  //   data: suggestedUsers,
  //   isLoading,
  //   isError,
  // } = useQuery(
  //   ["NewMessageSuggestedUsers", { userId: user?.id }],
  //   getSuggestedUsers,
  //   {
  //     enabled: !!user,
  //   },
  // );

  if (!user) return null;
  const handleStartChat = () => {
    if (!selectedUser) return;
    chatWith(selectedUser.id); // 👈 start chat with selected user
    cancelMsgNewUser(); // close modal
  };
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
        <SearchBoxInner placeholder="Search person" />
        <div className="thinScroll h-full overflow-y-scroll max-h-80">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              {isLoading ? (
                <Spinner />
              ) : (
                messages &&
                messages.map((user, i) => (
                  <HStack className="w-full justify-between cursor-pointer">
                    <HStack
                      key={user.id}
                      className={`w-full cursor-pointer p-2 rounded-lg transition ${selectedUser?.id === user.id ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      onClick={() => setSelectedUser(user)} // 👈 select user
                    >
                      <Avatar
                        name={user.name}
                        src={user.avatar}
                        key={i}
                      />
                      <div className="flex flex-col gap-0">
                        <p className="text-lg font-semibold">{user.name}</p>
                        {/* <p>message preview</p> */}
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
          <ShadCnButton
            disabled={!selectedUser}
            onClick={handleStartChat}
          >
            Start Chat
          </ShadCnButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
