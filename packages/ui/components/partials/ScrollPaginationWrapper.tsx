import React from "react";
import { usePaginationControlsOptions } from "..";

export const useCursorScrollPagination = ({ take = 10 }: { take: number }) => {
  const [nextCursor, setNextCursor] = React.useState<string>();
  const [cursor, setCursor] = React.useState<string>();
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  return {
    props: {
      cursor,
      take,
    },
    controls: {
      next: () => setCursor(nextCursor),
      hasMore,
    },
    getNextCursor: (v?: string) => setNextCursor(v),
    getHasMore: (v: boolean) => setHasMore(v),
  };
};

export const ScrollPaginationWrapper: React.FC<{
  controls: usePaginationControlsOptions;
}> = ({ children, controls }) => {
  const [endTriggered, setEndTriggered] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleEndReached = () => {
    if (!endTriggered) {
      setEndTriggered(true);
    }
  };

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    document.addEventListener("scroll", (e) => {
      const screenH = window.screen.height;

      if (ref.current) {
        const dims = ref.current.getBoundingClientRect();

        if (dims.y - screenH + dims.height < 1) {
          handleEndReached();
        }
      }
    });
  }

  return <div ref={ref}>{children}</div>;
};

export const ScrollCursorPaginationWrapper: React.FC<{
  controls: ReturnType<typeof useCursorScrollPagination>["controls"];
}> = ({ children, controls }) => {
  const [endTriggered, setEndTriggered] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleEndReached = () => {
    if (!endTriggered) {
      setEndTriggered(true);
    }
  };

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    document.addEventListener("scroll", (e) => {
      const screenH = window.screen.height;

      if (ref.current) {
        const dims = ref.current.getBoundingClientRect();

        if (dims.y - screenH + dims.height < 1) {
          handleEndReached();
        }
      }
    });
  }

  return <div ref={ref}>{children}</div>;
};
