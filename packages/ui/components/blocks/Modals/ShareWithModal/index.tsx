"use client";
import { Dialog, DialogBackdrop, DialogPanel, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import {
  Button,
  SpinnerFallback,
} from "@UI";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import {
  X,
  MessageSquare,
  Smartphone,
  Instagram,
  Facebook,
  Mail,
  Link,
  QrCode,
  Repeat,
} from "lucide-react";

export interface ShareWithModalProps {}

export const useShareWithModal = () => {
  const { Listen, emit, removeListner } = useReactPubsub(
    (e) => "OpenShareWithModal",
  );

  function openShareModal(id: string) {
    emit({ id });
  }

  function CloseModal() {
    emit();
  }

  return {
    emit,
    Listen,
    removeListner,
    openShareModal,
    CloseModal,
  };
};

// Generate some random avatar images (using Unsplash)
const FAKE_DATA = Array.from({ length: 8 }).map((_, i) => ({
  id: `${i + 1}`,
  name: ["Ava", "Ella", "Kai", "Nora", "Liam", "Mia", "Noah", "Sophia", "Lucas", "Isabella", "Ethan", "Olivia"][i % 12],
  username: `@user${i + 1}`,
  photo: `https://picsum.photos/seed/user${i + 1}/100/100`,
}));

export const ShareWithModal: React.FC = () => {
  const { Listen } = useShareWithModal();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState<string>();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<typeof FAKE_DATA>([]);
  const [shareWith, setShareWith] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for modal opening with a post ID
  useEffect(() => {
    Listen((props) => {
      if ("id" in props && typeof props.id === "string") {
        setPostId(props.id);
        setIsOpen(true);
      }
    });
  }, [Listen]);

  // Filter contacts
  useEffect(() => {
    setFiltered(
      FAKE_DATA.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  function handleAddToShareList(userId: string) {
    setShareWith((state) => [...state, userId]);
  }
  function handleRemoveFromShareList(userId: string) {
    setShareWith((state) => state.filter((user) => user !== userId));
  }
  const toggleUser = (id: string) => {
    // shareWith.includes(id)
    //   ? handleRemoveFromShareList(id)
    //   : handleAddToShareList(id);
  };

  const shareOptions = [
    { label: "SMS", icon: <Smartphone className="h-4 w-4 mr-2" /> },
    { label: "WhatsApp Contact", icon: <MessageSquare className="h-4 w-4 mr-2 text-green-600" /> },
    { label: "Instagram", icon: <Instagram className="h-4 w-4 mr-2 text-pink-500" /> },
    { label: "Facebook", icon: <Facebook className="h-4 w-4 mr-2 text-blue-600" /> },
    { label: "Direct Message", icon: <MessageSquare className="h-4 w-4 mr-2 text-purple-600" /> },
    { label: "Email", icon: <Mail className="h-4 w-4 mr-2 text-red-500" /> },
    { label: "Copy Link", icon: <Link className="h-4 w-4 mr-2" /> },
    { label: "QR Code", icon: <QrCode className="h-4 w-4 mr-2" /> },
    { label: "Repost", icon: <Repeat className="h-4 w-4 mr-2" /> },
  ];

  return (
    <Transition show={isOpen}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Overlay */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-4 md:p-6 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <Dialog.Title className="text-lg font-semibold">
                {t("share_with", "Share with")}
              </Dialog.Title>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <SearchBoxInner placeholder="Search contacts" onChange={(e: any) => setSearch(e.target.value)} />
            </div>

            {/* Contacts */}
            <div className="mt-6">
              <SpinnerFallback isLoading={isLoading}>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {filtered.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => toggleUser(user.id)}
                        className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition ${
                          shareWith.includes(user.id)
                            ? "ring-2 ring-black"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <p className="mt-2 text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.username}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-6">
                    {t("no_results", "No results found")}
                  </p>
                )}
              </SpinnerFallback>
            </div>

            {/* Share via */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {t("share_via", "Share via")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.label}
                    className="flex items-center justify-start border rounded-lg py-2 px-3 text-sm font-medium hover:bg-gray-50"
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <Button onClick={() => console.log("Share", shareWith)}>
                {t("share", "Share")}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
