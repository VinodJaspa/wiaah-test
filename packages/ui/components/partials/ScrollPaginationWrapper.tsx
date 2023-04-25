import React from "react";
import { usePaginationControlsOptions } from "..";
import { HtmlDivProps } from "@UI/../types/src";

export type useCursorScrollPaginationControls = {
  next: () => any;
  hasMore: boolean;
};

export const useCursorScrollPagination = (props?: {
  take?: number;
}): {
  props: {
    cursor?: string;
    take: number;
  };
  controls: useCursorScrollPaginationControls;
  getNextCursor: (v?: string) => any;
  getHasMore: (v: boolean) => any;
} => {
  const take = props && props.take ? props.take : 10;
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

export const ScrollPaginationWrapper: React.FC<
  {
    controls: usePaginationControlsOptions;
    axis?: "x" | "y";
  } & HtmlDivProps
> = ({ children, controls, ...rest }) => {
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

  return (
    <div {...rest} ref={ref}>
      {children}
    </div>
  );
};

interface ScrollCursorPaginationWrapperProps extends HtmlDivProps {
  controls: ReturnType<typeof useCursorScrollPagination>["controls"];
  axis?: "x" | "y";
}

export const ScrollCursorPaginationWrapper: React.FC<
  ScrollCursorPaginationWrapperProps
> = ({ children, controls, ...rest }) => {
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

  return (
    <div {...rest} ref={ref}>
      {children}
    </div>
  );
};
