import React from "react";
import { SubscribersUserInfo } from "types";
import { SubscriberCard, Input, Divider } from "ui";
import { useTranslation } from "react-i18next";

export interface SubscribersListProps {
  users: SubscribersUserInfo[];
  title?: string;
  onClose?: () => void;
}

export const SubscribersList: React.FC<SubscribersListProps> = ({
  users,
  onClose,
  title,
}) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [searchValue, setSearchValue] = React.useState<string>();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  return (
    <div className="thinScroll flex flex-col items-end bg-white px-2 max-h-[40rem] w-full overflow-y-scroll gap-2">
      <Input
        className="shadow-md py-4"
        placeholder={t("search", "Search")}
        value={searchValue}
        onChange={handleChange}
      />
      <div className="h-full w-full py-2 gap-2 flex flex-col">
        {users.map((user, i) => (
          <SubscriberCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default SubscribersList;
