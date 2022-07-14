import React from "react";

export const usePagination = (take: number = 10) => {
  const [page, setPage] = React.useState<number>(0);

  function nextPage() {
    setPage((page) => page + 1);
  }

  function previousPage() {
    setPage((page) => (page < 1 ? 1 : page - 1));
  }

  function goToPage(pageNum: number) {
    if (pageNum <= 0) return;
    setPage(pageNum);
  }

  return {
    page,
    nextPage,
    previousPage,
    take,
    goToPage,
  };
};
