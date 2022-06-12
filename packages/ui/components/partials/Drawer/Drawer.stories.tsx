import { storybookPartailsTitle, StorybookImplemntationLayout } from "utils";
import { ComponentMeta } from "@storybook/react";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Button,
  DrawerCloseButton,
} from "ui";
import React from "react";

export default {
  title: storybookPartailsTitle + "Drawer",
  component: Drawer,
} as ComponentMeta<typeof Drawer>;

export const Default = () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  return (
    <StorybookImplemntationLayout
      implmentation={`
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Button,
  DrawerCloseButton,
} from "ui";

...
const [isOpen, setOpen] = React.useState<boolean>(false);

return
<> 
    <Button onClick={() => setOpen(true)}>open</Button>
    <Drawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
    >
        <DrawerOverlay />
        <DrawerContent className="p-4 flex flex-col gap-4 justify-center items-center">
            <DrawerCloseButton>
            <Button>close</Button>
            </DrawerCloseButton>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
            nemo facere corrupti aperiam perspiciatis? Perspiciatis temporibus eum
            quaerat incidunt eos. Sint minus vitae tempora excepturi, ducimus
            possimus cupiditate provident necessitatibus?
        </DrawerContent>
    </Drawer>
</>
        `}
    >
      <Button onClick={() => setOpen(true)}>open</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <DrawerOverlay />
        <DrawerContent className="p-4 flex flex-col gap-4 justify-center items-center">
          <DrawerCloseButton>
            <Button>close</Button>
          </DrawerCloseButton>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          nemo facere corrupti aperiam perspiciatis? Perspiciatis temporibus eum
          quaerat incidunt eos. Sint minus vitae tempora excepturi, ducimus
          possimus cupiditate provident necessitatibus?
        </DrawerContent>
      </Drawer>
    </StorybookImplemntationLayout>
  );
};

export const Right = () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        position="right"
      >
        <DrawerOverlay />
        <DrawerContent className="p-4 flex flex-col gap-4 justify-center items-center">
          <DrawerCloseButton>
            <Button>close</Button>
          </DrawerCloseButton>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          nemo facere corrupti aperiam perspiciatis? Perspiciatis temporibus eum
          quaerat incidunt eos. Sint minus vitae tempora excepturi, ducimus
          possimus cupiditate provident necessitatibus?
        </DrawerContent>
      </Drawer>
    </>
  );
};
export const top = () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        position="top"
      >
        <DrawerOverlay />
        <DrawerContent className="p-4 flex flex-col gap-4 justify-center items-center">
          <DrawerCloseButton>
            <Button>close</Button>
          </DrawerCloseButton>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          nemo facere corrupti aperiam perspiciatis? Perspiciatis temporibus eum
          quaerat incidunt eos. Sint minus vitae tempora excepturi, ducimus
          possimus cupiditate provident necessitatibus?
        </DrawerContent>
      </Drawer>
    </>
  );
};
export const bottom = () => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        position="bottom"
      >
        <DrawerOverlay />
        <DrawerContent className="p-4 flex flex-col gap-4 justify-center items-center">
          <DrawerCloseButton>
            <Button>close</Button>
          </DrawerCloseButton>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          nemo facere corrupti aperiam perspiciatis? Perspiciatis temporibus eum
          quaerat incidunt eos. Sint minus vitae tempora excepturi, ducimus
          possimus cupiditate provident necessitatibus?
        </DrawerContent>
      </Drawer>
    </>
  );
};
