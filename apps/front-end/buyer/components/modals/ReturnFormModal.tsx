import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const reasons = ["Too small", "Too big", "Damaged", "Wrong Item", "Other"];

export default function ReturnFormModal({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Handle return logic
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold text-gray-900 mb-1">Return Items</Dialog.Title>
                <p className="text-sm text-gray-500 mb-5">Order #1234567890</p>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Men's Running Shoes", size: "Size M", img: "https://i5.walmartimages.com/seo/OnyxTrek-Mens-Basketball-Shoes-Fashion-Non-Slip-Lightweight-Breathable-Outdoor-Sneakers-Cushioning-Workout-Shoes-for-Running-Walking-Sports-Training_91394641-d408-44f6-a463-8c5e5b464194.25f30d46791c412b70e9d63467f335b9.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" },
                    { name: "Women's Yoga Pants", size: "Size S", img: " https://ae01.alicdn.com/kf/HTB1xcbxgcrI8KJjy0Fhq6zfnpXaS/Vertvie-Women-Yoga-Pant-3D-Print-Tree-High-Waist-Skinny-Sports-Legging-Gym-Fitness-Push-Up.jpg" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-14 h-14 rounded object-cover" />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.size}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reasons */}
                <div className="mb-5">
                  <h2 className="text-sm font-medium mb-2">Reason for Return</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {reasons.map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center border rounded px-3 py-2 text-sm cursor-pointer ${
                          selectedReason === reason ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          value={reason}
                          checked={selectedReason === reason}
                          onChange={() => setSelectedReason(reason)}
                          className="form-radio text-red-600 mr-2"
                        />
                        {reason}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell more about the situation"
                  className="w-full border border-gray-300 rounded p-3 text-sm mb-6 focus:outline-none focus:ring-1 focus:ring-red-500"
                />

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-red-600 text-white text-sm px-5 py-2 rounded hover:bg-red-700"
                  >
                    Submit Return
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
