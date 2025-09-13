import { Dialog } from "@headlessui/react";
import AddShippingMethodForm from "components/AddShippingMethodForm";
import { AiOutlineClose } from "react-icons/ai";

export default function AddShippingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centered Modal */}
      <div className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-2xl mx-auto my-auto z-50">

        <Dialog.Panel className="bg-white rounded-lg  space-y-6 overflow-auto max-h-[90vh] shadow-lg w-auto pr-12 pl-20 pt-12 pb-12">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl font-semibold">
              Add Shipping Method
            </Dialog.Title>
            <button onClick={onClose}>
              <AiOutlineClose className="text-gray-500 hover:text-black text-lg" />
            </button>
          </div>

          <AddShippingMethodForm />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
