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

export interface BlocklistSectionProps {}

export const BlocklistSection: React.FC<BlocklistSectionProps> = ({}) => {
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
          <div className="font-bold w-full justify-between hidden lg:flex">
            <span>{t("name", "Name")}</span>
            <span>{t("status", "Status")}</span>
          </div>
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            {mapArray(data, ({ blockedProfile: user }, i) => (
              <div
                data-testid={"BlockedUserCard"}
                key={i}
                className="flex items-center gap-2 justify-between"
              >
                <div className="flex items-center gap-2">
                  <Avatar name={user?.username} src={user?.photo} />
                  <p className="text-lg font-semibold">{user?.username}</p>
                  {user?.verified ? (
                    <VerifiedIcon className="text-xs text-secondaryBlue" />
                  ) : null}
                </div>
                <Button
                  data-testid={"UnFollowBtn"}
                  onClick={() => {
                    if (user?.id) {
                      unblockUser({ userId: user.id });
                    }
                  }}
                  className="w-24"
                  colorScheme={"darkbrown"}
                >
                  {t("Unblock")}
                </Button>
              </div>
            ))}
          </SpinnerFallback>
        </div>
      </div>
    </div>
  );
};
