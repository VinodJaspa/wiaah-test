import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";

// Simple skeleton card
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-2xl h-60 w-full shadow-sm" />
);

interface InfiniteScrollWrapperProps {
  dataLength: number;
  hasMore: boolean;
  next: () => void;
  children: React.ReactNode;
  skeletonCount?: number;
}

export const InfiniteScrollWrapper: React.FC<InfiniteScrollWrapperProps> = ({
  dataLength,
  hasMore,
  next,
  children,
  skeletonCount = 6,
}) => {
  const { t } = useTranslation();

  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={
        <div className="w-full flex justify-center py-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 w-full">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
      endMessage={
        <div className="flex w-full justify-center py-10">
          <div className="text-center text-gray-600 bg-gray-100 px-6 py-3 rounded-full shadow-md text-sm font-medium">
            🎉 {t("You are all caught up!")}
          </div>
        </div>
      }
    >
      {/* grid only for items */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {children}
      </div>

    </InfiniteScroll>
  );
};
