import { usePagination } from "hooks";
import React from "react";
import { HtmlDivProps } from "types";
import { Pagination } from "@UI";

export const PaginationWrapper: React.FC<HtmlDivProps> = ({
  children,
  ...props
}) => {
  const { goToPage } = usePagination();
  return (
    <div
      {...props}
      className={`${props.className} self flex w-full flex-col gap-4 items-center`}
    >
      {children}
      <Pagination onPageChange={goToPage} />
    </div>
  );
};
