import { IoIosArrowBack } from "react-icons/io";
import SectionTitle from "../shadcn-components/Title/SectionTitle";

export default function NavigationHeader({ title, onBack }) {
  return (
    <div className="flex items-center px-4 py-4 ">
      {/* Back button only visible on small screens */}
      <button
        onClick={onBack}
        className="text-2xl text-gray-700 focus:outline-none sm:hidden"
        aria-label="Go back"
      >
        <IoIosArrowBack />
      </button>

      {/* Title always visible and centered */}
      <div className="flex-grow text-center">
        <SectionTitle title={title}></SectionTitle>
      </div>

      {/* Placeholder div only on small screens for centering */}
      <div className="w-8 sm:hidden" />
    </div>
  );
}
