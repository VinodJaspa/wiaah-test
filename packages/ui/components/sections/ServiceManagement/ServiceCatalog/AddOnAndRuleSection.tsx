
import { Switch } from "@headlessui/react";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import {useState} from "react"
import { HiPlus } from "react-icons/hi";
export default function AddonsAndRulesSection({setAddOnDialogOpen}) {
    const [noSmoking, setNoSmoking] = useState(false);
    const [noPets, setNoPets] = useState(false);
    const [noParties, setNoParties] = useState(false);
  
    return (
      <div className="space-y-8">
        {/* Add-ons Section */}
        <div className="flex justify-between items-start">
          <div>
            <Subtitle>Add-ons</Subtitle>

            <p className="text-sm text-gray-600">
              Offer guests additional services to enhance their stay.
            </p>
          </div>
          <button className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center" onClick={()=> setAddOnDialogOpen(true)}>
            <HiPlus className="text-gray-700" />
          </button>
        </div>
  
        {/* House Rules Section */}
        <div className="space-y-6">
          <Subtitle >House rules</Subtitle>
     
  
          {/* Rule Toggle Item */}
          <RuleToggle
            label="No smoking"
            description="Smoking is not allowed inside the property."
            enabled={noSmoking}
            onChange={setNoSmoking}
          />
          <RuleToggle
            label="No pets"
            description="Pets are not allowed on the premises."
            enabled={noPets}
            onChange={setNoPets}
          />
          <RuleToggle
            label="No parties"
            description="Parties or events are not permitted."
            enabled={noParties}
            onChange={setNoParties}
          />
        </div>
      </div>
    );
  }
  
  // ✅ Rule Toggle Component
  function RuleToggle({
    label,
    description,
    enabled,
    onChange,
  }: {
    label: string;
    description: string;
    enabled: boolean;
    onChange: (val: boolean) => void;
  }) {
    return (
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Switch
          checked={enabled}
          onChange={onChange}
          className={`${
            enabled ? "bg-green-500" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    );
  }
