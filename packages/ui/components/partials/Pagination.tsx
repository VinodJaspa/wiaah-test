import React from "react";
import {
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export interface PaginationProps {
  maxPages?: number;
  controls?:any;
  onPageChange?: (pageNum: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  maxPages = 5,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > maxPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <ul className="inline-flex items-center space-x-2">
        {/* Previous */}
        <li
          onClick={() => handlePageChange(currentPage - 1)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaAngleLeft className="h-3 w-3" />
        </li>

        {/* Page Numbers */}
        {Array.from({ length: maxPages }, (_, i) => i + 1).map((num) => (
          <li
            key={num}
            onClick={() => handlePageChange(num)}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border ${
              currentPage === num
                ? "bg-gray-300 text-black"
                : "border-gray-300 text-gray-600 hover:bg-black hover:text-white"
            }`}
          >
            {num}
          </li>
        ))}

        {/* Next */}
        <li
          onClick={() => handlePageChange(currentPage + 1)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 ${
            currentPage === maxPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaAngleRight className="h-3 w-3" />
        </li>
      </ul>
    </div>
  );
};
