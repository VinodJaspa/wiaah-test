import { useSocialControls } from "@blocks";
import { Drawer, DrawerContent } from "@partials";
import React from "react";

export const ServiceDetailsDrawer: React.FC = () => {
  const { value, closeServiceDetails } = useSocialControls("serviceDetailsId");
  const serviceId = typeof value === "string" ? value : undefined;

  return (
    <Drawer isOpen={!!serviceId} onClose={closeServiceDetails}>
      <DrawerContent>
        <></>
      </DrawerContent>
    </Drawer>
  );
};
