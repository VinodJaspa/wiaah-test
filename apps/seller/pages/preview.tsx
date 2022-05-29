import { NextPage } from "next";
import React from "react";
import { useGetMyUserData } from "ui/Hooks";
import { QueryClient, QueryClientProvider } from "react-query";

const preview: NextPage = () => {
  const { data, isLoading } = useGetMyUserData();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full h-full justify-center items-center">
        isloading {isLoading}
        {JSON.stringify(data)}
      </div>
    </QueryClientProvider>
  );
};

export default preview;
