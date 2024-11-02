import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { useReactPubsub } from "react-pubsub";
import {
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

export const useShareWithModal = () => {
  const { Listen, emit, removeListner } = useReactPubsub(
    (e) => "OpenShareWithModal",
  );

  function OpenModal(id: string) {
    emit({ id });
  }

  function CloseModal() {
    emit();
  }

  return {
    emit,
    Listen,
    removeListner,
    OpenModal,
    CloseModal,
  };
};

export const ShareWithModal: React.FC = () => {
  const { Listen } = useShareWithModal();
  const [postId, setPostId] = React.useState<string | undefined>();
  const { t } = useTranslation();
  const [messageValue, setMessageValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  // Fetch data with the search key
  const { data: _data, isLoading, isError } = useGetShareWithFriends(search);
  const data = FAKE_DATA;

  // State to store the filtered results
  const [filtered, setFiltered] = React.useState<typeof data>([]);

  const [shareWith, setShareWith] = React.useState<string[]>([]);

  // Listen for modal opening with a post ID
  React.useEffect(() => {
    Listen((props) => {
      if ("id" in props && typeof props.id === "string") {
        setPostId(props.id);
      }
    });
  }, [Listen]);

  // Update `filtered` whenever `data` or `search` changes
  React.useEffect(() => {
    if (data) {
      setFiltered(
        data.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [data, search]);

  // Functions to add/remove users from share list
  function handleAddToShareList(userId: string) {
    setShareWith((state) => [...state, userId]);
  }
  function handleRemoveFromShareList(userId: string) {
    setShareWith((state) => state.filter((user) => user !== userId));
  }

  return (
    <Modal isOpen={!!postId} onClose={() => setPostId(undefined)}>
      <ModalOverlay />
      <ModalContent>
        <p className="text-xl font-semibold">{t("share_with", "Share with")}</p>
        <div className="w-[400px]">
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
                {filtered && filtered.length > 0 ? (
                  filtered.map((user) => (
                    <HStack key={user.id}>
                      <Checkbox
                        onChange={(e) =>
                          e.target.checked
                            ? handleAddToShareList(user.id)
                            : handleRemoveFromShareList(user.id)
                        }
                        className="border-black"
                      />
                      <div className="w-12 h-12">
                        <img
                          className="bg-black object-contain w-full h-full rounded-lg"
                          src={user.photo}
                          alt={user.name}
                        />
                      </div>
                      <p>{user.name}</p>
                    </HStack>
                  ))
                ) : (
                  <p>{t("no_results", "No results found")}</p>
                )}
              </SpinnerFallback>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            onClick={() => {
              /* handle share logic */
            }}
          >
            {t("share", "Share")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

const FAKE_DATA = [
  { id: "1", name: "wiaah", photo: "/wiaah_logo.png" },
  { id: "2", name: "seller", photo: "/shop.jpeg" },
  { id: "3", name: "buyer", photo: "/shop-2.jpeg" },
  { id: "4", name: "wiaah", photo: "/wiaah_logo.png" },
  { id: "5", name: "seller", photo: "/shop.jpeg" },
  { id: "6", name: "buyer", photo: "/shop-2.jpeg" },
];
