import { Dialog, Transition } from "@headlessui/react";
import ModalTitle from "@UI/components/shadcn-components/Title/DailogTitle";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import { Fragment, useState } from "react";
import SuspendAccountDialog from "./SuspendAccountDialog";

import { errorToast, successToast } from "utils";
import { useSuspendAccountMutation } from "@src/Hooks";
import { useLogoutMutation } from "@features/Accounts/services/useLogout";
import { useDeleteMyAccountMutation } from "@features/Accounts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
}

export default function AccountManagementDialog({ isOpen, onClose, accountId }: Props) {
  const [isSuspendDialog, setSuspendDialog] = useState(false);

  const { mutate: logout } = useLogoutMutation();
  const { mutate: suspendAccount, isLoading: isSuspending } = useSuspendAccountMutation();
  const { mutate: deleteAccount, isLoading: isDeleting } = useDeleteMyAccountMutation();

  const handleSuspend = () => {
    if (!accountId) return;

    suspendAccount(
      { args: { accountId } },
      {
        onSuccess: () => {
          successToast("Account suspended successfully.");
          logout(undefined, {
            onSuccess: () => {
            //   successToast("Logged out after account suspension.");
              window.location.href = "/";
            },
            onError: (err) => {
            //   errorToast("Logout failed.");
              console.error(err);
            },
          });
          setSuspendDialog(false);
          onClose();
        },
        onError: (err) => {
          errorToast("Failed to suspend account.");
          console.error(err);
        },
      }
    );
  };

  const handleDelete = (reason: string, password: string, sendData: boolean = false) => {
    deleteAccount(
      {
        reason,
        password,
        sendData,
      },
      {
        onSuccess: () => {
          successToast("Account deletion requested.");
          onClose();
        },
        onError: (err) => {
          errorToast("Failed to request account deletion.");
          console.error(err);
        },
      }
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <SuspendAccountDialog
        isOpen={isSuspendDialog}
        onClose={() => setSuspendDialog(false)}
        onConfirm={handleSuspend}
        isLoading={isSuspending}
      />

      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white w-full max-w-[520px] rounded-lg p-6 shadow-lg">
                <ModalTitle>Account Management</ModalTitle>

                <div className="space-y-8">
                  {/* Delete Account */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-md font-semibold">Delete Account</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <button
                      disabled={isDeleting}
                      onClick={() => handleDelete("reason", "password")}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>

                  {/* Suspend Account */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Subtitle>Suspend Account</Subtitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Temporarily suspend your account. You can reactivate it at any time.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuspendDialog(true)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-md border border-gray-300"
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
