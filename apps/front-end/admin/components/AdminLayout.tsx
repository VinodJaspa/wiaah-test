import React from "react";
import { useRouting } from "routing";
import { AdminCommentsModal } from "ui";
import { AdminHeader } from "./AdminHeader";
import { AdminNavigationSidebar } from "./AdminNavigationSidebar";

export const AdminLayout: React.FC = ({ children }) => {
  const { getCurrentPath } = useRouting();
  return (
    <>
      <AdminCommentsModal />
      <div className="w-full overflow-x-hidden min-h-[100vh] grid grid-cols-6">
        <AdminNavigationSidebar
          currentUrl={getCurrentPath()}
          onRoute={() => {}}
        />
        <div className="flex pb-8 thinScroll flex-col h-screen overflow-y-scroll px-12 w-full gap-4 col-span-5">
          <>
            <AdminHeader
              title={getCurrentPath().split("/")[1].split("-").join(" ")}
            />
            {children}
          </>
        </div>
      </div>
    </>
  );
};
