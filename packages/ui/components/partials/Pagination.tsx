import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

export interface PaginationProps {
  maxPages: number;
  onPageChange?: (pageNum: number) => void;
  morePages?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  morePages,
  onPageChange,
  maxPages,
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage]);

  function handleNextPage(last?: boolean) {
    if (currentPage >= maxPages) return;
    setCurrentPage((state) => {
      if (!last) return state + 1;
      return maxPages;
    });
  }

  function handlePrevPage(last?: boolean) {
    if (currentPage <= 1) return;
    setCurrentPage((state) => {
      if (!last) return state - 1;
      return 1;
    });
  }
  return (
    <>
      <div className="flex w-full justify-center">
        <ul className="inline-flex items-center space-x-4 p-2 text-white">
          <li
            onClick={() => handlePrevPage(true)}
            id="FirstPageBtn"
            className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-primary p-3"
          >
            <FaAngleDoubleLeft className="h-5 w-5" />
          </li>
          <li
            onClick={() => handlePrevPage()}
            id="PrevPageBtn"
            className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-primary p-3"
          >
            <FaAngleLeft className="h-5 w-5" />
          </li>
          <li
            id="CurrentPage"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary p-3"
          >
            {currentPage}
          </li>
          <li
            onClick={() => handleNextPage()}
            id="NextPageBtn"
            className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-primary p-3"
          >
            <FaAngleRight className="h-5 w-5" />
          </li>
          <li
            onClick={() => handleNextPage(true)}
            id="LastPageBtn"
            className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-primary p-3"
          >
            <FaAngleDoubleRight className="h-5 w-5" />
          </li>
        </ul>
      </div>
    </>
  );
};
