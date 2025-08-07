import { AiOutlinePlus } from "react-icons/ai";

export default function AddShippingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
    >
      <AiOutlinePlus />
      Add New shipping
    </button>
  );
}
