import React from "react";
import {
  Button,
  Avatar,
  SectionHeader,
  SpinnerFallback,
  useGetMyBlockListQuery,
  VerifiedIcon,
} from "@UI";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useUnBlockUserMutation } from "@features/Social/services/Mutations/Block";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";

export interface BlocklistSectionProps { }

export const BlocklistSection: React.FC<BlocklistSectionProps> = ({ }) => {
  const { t } = useTranslation();
  const { mutate: unblockUser } = useUnBlockUserMutation();
  const [unblockedUsersIds, setUnBlockedUsersIds] = React.useState<string[]>(
    []
  );

  const { data, isLoading, isError } = useGetMyBlockListQuery();

  return (
    <div className="h-full w-full flex lg:gap-8 gap-2 flex-col p-2">
      <SectionHeader sectionTitle={t("block_list", "Block List")} />
      <div className="h-full flex flex-col gap-4 justify-between">
        <div className="flex gap-4 flex-col">
          <SearchBoxInner placeholder="Search" />
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {mapArray(data, ({ blockedProfile: user }, i) => (
              <div
                data-testid={"BlockedUserCard"}
                key={i}
                className="flex items-center gap-2 justify-between"
              >
               
                <div className="flex items-center gap-4">
              <img
                src={user?.photo}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-xs  text-gray-500">@{user.username}</p>
              </div>
            </div>
                <button
                  onClick={() => {
                    if (user?.id) {
                      unblockUser({ userId: user.id });
                    }
                  }}
                  className="px-4 py-1 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  Unblock
                </button>

              </div>
            ))}
          </SpinnerFallback>
          <Pagination total={5} current={1} onPageChange={()=>{}}/>
        </div>
      </div>
    </div>
  );
};
