import {
  Divider,
  SpinnerFallback,
  useGetPostMentionsQuery,
  usePaginationControls
} from "@UI";
import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { Avatar } from "@UI/components/shadcn-components/table";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsubModal } from "react-pubsub";
import { mapArray } from "utils";


export const useSocialPostMentionsModal = (sub?: boolean) =>
  useReactPubsubModal<{ postId: string; postType: string }>(
    () => "postMentionsModal",
    sub
  );

export const SocialPostMentionsModal: React.FC = () => {
  const { close, isOpen, value } = useSocialPostMentionsModal(true);
  const { pagination } = usePaginationControls();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetPostMentionsQuery(
    value as { postId: string; postType: string },
    pagination,
    {
      enabled: !!value,
    }
  );

  return (
    <Transition appear show={isOpen} as={Fragment as React.ElementType}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-y-scroll h-[100vh] rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title as="h3" className="text-xl font-semibold">
                <p className="font-semibold text-base">{t("Mentioned Pepole")}</p>
              </Dialog.Title>

            </div>


            <SpinnerFallback isLoading={isLoading} isError={isError}>

              <Divider />
              <div className="flex flex-col  px-2 overflow-scroll thinScroll gap-4">
                {mapArray(
                  data?.data,
                  ({ note, profielId, thumbnail, userId, username }, i) => (
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <Avatar

                          src={thumbnail}
                          alt={username}
                        />
                        <div className="flex flex-col 1">
                          <p className="font-medium text-base">{username}</p>
                          <p className="text-grayText">{note}</p>
                        </div>
                      </div>
                      <div>
                        <PrimaryButton className="h-auto ">{t("Follow")}</PrimaryButton>
                      </div>
                    </div>
                  )
                )}
              </div>
            </SpinnerFallback>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>

  );
};
