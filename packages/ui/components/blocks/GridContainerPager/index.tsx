import React from "react";
import { Pagination, Spacer } from "@UI/components";

export interface GridContainerPager {
  componentsLimit: number;
  children?: React.ReactNode[];
  onPageChange?: (pageNum: number) => void;
  showPagination?: boolean;
}

export const GridContainerPager: React.FC<GridContainerPager> = ({
  componentsLimit,
  children,
  onPageChange,
  showPagination = true,
}) => {
  const [components, setComponents] = React.useState<React.ReactNode[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
    if (!children) return;
    const start = componentsLimit * currentPage - componentsLimit;
    const end =
      start + componentsLimit > children.length - 1
        ? children.length
        : start + componentsLimit;
    const currentPageComponents = children.slice(start, end);
    setComponents(currentPageComponents);
  }, [currentPage, children]);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {components.map((comp, i) => {
          if (i < componentsLimit) {
            return (
              //@ts-ignore
              <div key={i}>{comp}</div>
            );
          }
        })}
      </div>
      <Spacer />
      <Spacer />
      {showPagination && (
        <Pagination
          onPageChange={(pageNumber) => handlePageChange(pageNumber)}
          maxPages={children ? Math.ceil(children.length / componentsLimit) : 1}
        />
      )}
    </div>
  );
};
