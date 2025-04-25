
import React from "react";
import { MdClose } from "react-icons/md";
import { SubscribersUsersPlaceholder } from "../../../../placeholder/social";
import { ShadcnDialog, SubscribersList } from "ui";

export interface SubscribersPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
export const SubscribersPopup: React.FC<SubscribersPopupProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  return (
    <ShadcnDialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
          <div className="flex justify-between items-center">
            <span className="invisible">.</span>
            <span className="font-semibold text-xl capitalize">{title}</span>
            <MdClose className="cursor-pointer text-2xl" onClick={onClose} />
          </div>
          <div className="max-h-[40rem] p-1 overflow-auto">
            <SubscribersList onClose={onClose} users={SubscribersUsersPlaceholder} />
          </div>
        </div>
      </div>
    </ShadcnDialog>
  );
};
