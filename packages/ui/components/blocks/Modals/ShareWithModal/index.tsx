import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { useReactPubsub } from "react-pubsub";
import {
  useShareWithModal,
  useGetShareWithFriends,
  SpinnerFallback,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Checkbox,
  ModalCloseButton,
  CloseIcon,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
} from "@UI";

export interface ShareWithModalProps { }

interface Events {
  sharePostWithModal: () => void;
}

export const ShareWithModal: React.FC<ShareWithModalProps> = ({ }) => {
  const { Listen } = useReactPubsub<Events>((keys) => "sharePostWithModal");
  const [postId, setPostId] = React.useState<string>();
  const { t } = useTranslation();

  const [messageValue, setMessageValue] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const { data, isLoading, isError } = useGetShareWithFriends(search);
  const [filtered, setFiltered] = React.useState<typeof data>([]);

  const [shareWith, setShareWith] = React.useState<string[]>([]);

  React.useEffect(() => {
    Listen((props) => {
      if ("id" in props && typeof props.id === "string") {
        setPostId(props.id);
      }
    });
  }, []);
  React.useEffect(() => {
    if (data) {
      setFiltered(data.filter(({ name }) => name.includes(search)));
    }
  }, [search]);

  function handleAddToShareList(userId: string) {
    setShareWith((state) => [...state, userId]);
  }
  function handleRemoveFromShareList(userId: string) {
    setShareWith((state) => state.filter((user) => user !== userId));
  }

  return (
    <Modal
      isOpen={!!postId}
      onClose={() => setPostId(undefined)}
      onOpen={() => { }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader title="">
          <p>{t("share_with", "Share with")}</p>

          <ModalCloseButton>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <div>
          <div className="flex flex-col gap-4">
            <Input
              flushed
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              placeholder={`${t("write_a_message", "Write a message")}...`}
            />
            <InputGroup>
              <InputLeftElement>
                <HiSearch />
              </InputLeftElement>
              <Input
                flushed
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search", "Search")}
              />
            </InputGroup>
            <div className="thinScroll flex max-h-[20rem] overflow-scroll flex-col gap-4">
              <SpinnerFallback isLoading={isLoading} isError={isError}>
                {filtered &&
                  filtered.map((user, idx) => (
                    <HStack key={user.id + idx}>
                      <Checkbox
                        onChange={(e) => {
                          e.target.checked
                            ? handleAddToShareList(user.id)
                            : handleRemoveFromShareList(user.id);
                        }}
                        className="border-black"
                      />
                      <div className="w-12 h-12">
                        <img
                          className="bg-black object-contain w-full h-full rounded-lg"
                          src={user.photo}
                        />
                      </div>
                      <p>{user.name}</p>
                    </HStack>
                  ))}
              </SpinnerFallback>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>{t("share", "Share")}</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
