import React from "react";
import { Pagination, Spacer } from "../partials";

interface GridContainerPager {
  componentsLimit: number;
  children: React.ReactNode[];
  onPageChange?: (pageNum: number) => void;
}

export const GridContainerPager: React.FC<GridContainerPager> = ({
  componentsLimit,
  children,
  onPageChange,
}) => {
  console.log("childs", children);
  const [components, setComponents] = React.useState<React.ReactNode[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
    const start = componentsLimit * currentPage - componentsLimit;
    const end =
      start + componentsLimit > children.length - 1
        ? children.length
        : start + componentsLimit;
    const currentPageComponents = children.slice(start, end);
    setComponents(currentPageComponents);
  }, [currentPage]);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {components.map((comp, i) => {
          if (i < componentsLimit) {
            return <>{comp}</>;
          }
        })}
      </div>
      <Spacer />
      <Spacer />
      <Pagination
        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
        maxPages={Math.ceil(children.length / componentsLimit)}
      />
    </>
  );
};
