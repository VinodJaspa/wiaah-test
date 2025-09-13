// components/AddNewShippingButton.tsx
import { FiPlus } from "react-icons/fi";

export default function AddNewShippingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 flex items-center gap-2"
    >
      <FiPlus className="text-white" />
      Add New shipping
    </button>
  );
}
