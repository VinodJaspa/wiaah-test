import { Switch } from "@headlessui/react";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import { useState } from "react";

export default function BookingTermsSection() {
  const [depotRequired, setDepotRequired] = useState(false);

  return (
    <div className="space-y-6">
      {/* Depot Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <Subtitle>
          Depot required
          </Subtitle>
      
          <Switch
            checked={depotRequired}
            onChange={setDepotRequired}
            className={`${
              depotRequired ? "bg-green-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                depotRequired ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        {depotRequired && (
          <input
            type="text"
            placeholder="Depot price"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
        )}
      </div>

      {/* Cancellation Section */}
      <div>
        <Subtitle>
        Cancellation Terms
        </Subtitle>

        <p className="text-sm text-gray-600 mb-3">
          The guests may cancel the booking only up to 24 hours before the reservation time,
          unless they have paid a cancellation fee.
        </p>
        <input
          type="text"
          placeholder="Enter price"
          className="w-full px-4 py-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Pets Terms */}
      <div>
        <Subtitle>
        Pets Terms
        </Subtitle>

        <textarea
          placeholder="Describe your pets terms"
          className="w-full px-4 py-3 border border-gray-300 rounded-md h-28 resize-none"
        />
      </div>

      {/* Damages Terms */}
      <div>
        <Subtitle>
        Damages terms
        </Subtitle>

        <textarea
          placeholder="Describe your damages terms"
          className="w-full px-4 py-3 border border-gray-300 rounded-md h-28 resize-none"
        />
      </div>
    </div>
  );
}
