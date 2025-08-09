import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import { AiOutlinePlus } from "react-icons/ai";

export default function SpecialDiscount({handleOpenModal}) {
  return (
    <div className="space-y-4">
      <Subtitle>
      Special Discount (%)
      </Subtitle>
     

      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-800">Early bird</p>
          <p className="text-xs text-gray-400">End date : 25/12/2100</p>
        </div>
        <p className="text-sm font-medium text-gray-800">10%</p>
      </div>

      {/* Button with icon on right corner */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-800">Add discount</span>
        <button type="button" onClick={handleOpenModal}>
          <AiOutlinePlus className="text-lg text-gray-800" />
        </button>
      </div>
    </div>
  );
}
