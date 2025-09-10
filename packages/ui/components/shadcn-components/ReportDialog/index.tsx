"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface DialogItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface ReportDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  items: DialogItem[];
  onItemClick?: (item: { id: string; title: string }) => void;
}

export default function ReportDialog({
  open,
  setOpen,
  title,
  items,
  onItemClick,
}: ReportDialogProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                {/* Title */}
                <Dialog.Title className="text-lg font-semibold text-center mb-6">
                  {title}
                </Dialog.Title>

                {/* List Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemClick?.({ id: item.id, title: item.title });
                        setOpen(false); // auto close on click
                      }}
                      className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="w-6 h-6 text-gray-600">{item.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
