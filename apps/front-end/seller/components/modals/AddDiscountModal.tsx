import { Dialog } from "@headlessui/react";
import { AiOutlineClose, AiOutlineDollar, AiOutlinePercentage } from "react-icons/ai";
import TwoMonthRangePicker from "components/TwoMonthRangePicker";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

export default function AddDiscountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto m-20">
      <div className="min-h-screen flex items-center justify-center px-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Modal content */}
        <div className="relative bg-white rounded-lg w-full max-w-4xl mx-auto p-10 space-y-8 z-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-semibold text-gray-900">Add Discounts</Dialog.Title>
            <button onClick={onClose}>
              <AiOutlineClose className="text-xl text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{
              discountName: "",
              percent: "",
              price: "",
            }}
            onSubmit={(values) => {
              console.log({ ...values, dateRange });
              onClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="discountName">
                    Name
                  </label>
                  <Field
                    id="discountName"
                    name="discountName"
                    placeholder="Discount name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
                  />
                </div>

                {/* Discount % */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="percent">
                    Discount percent
                  </label>
                  <div className="relative">
                    <Field
                      id="percent"
                      name="percent"
                      type="number"
                      placeholder="Discount percent"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm pr-10"
                    />
                    <AiOutlinePercentage className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
                    Set a price
                  </label>
                  <div className="relative">
                    <Field
                      id="price"
                      name="price"
                      placeholder="$0.00"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm pr-10"
                    />
                    <AiOutlineDollar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-900">Select dates</label>
                  <div className="flex justify-center">
                    <TwoMonthRangePicker
                      range={dateRange}
                      onRangeChange={setDateRange}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-900"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
}
