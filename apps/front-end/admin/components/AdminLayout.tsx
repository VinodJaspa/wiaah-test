import React from "react";
import { useRouting } from "routing";
import { AdminHeader } from "./AdminHeader";
import { AdminNavigationSidebar } from "./AdminNavigationSidebar";

export const AdminLayout: React.FC = ({ children }) => {
  const { getCurrentPath } = useRouting();
  console.log(getCurrentPath());
  return (
    <div className="w-screen min-h-[100vh] grid grid-cols-6">
      <AdminNavigationSidebar
        currentUrl={getCurrentPath()}
        onRoute={() => {}}
      />
      <div className="flex flex-col px-12 w-full gap-4 col-span-5">
        <AdminHeader title="Dashboard" />
        {children}
      </div>
    </div>
  );
};
