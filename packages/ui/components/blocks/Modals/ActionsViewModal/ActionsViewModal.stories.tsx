import React from "react";
import {
  ActionsViewModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

// Mock fetcher function for demonstration
const mockFetcher = async (queryFn: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Mock Data" });
    }, 1000);
  });
};

// Define the story metadata
export default {
  title: "UI / Blocks / Modals /ActionsViewModal",
  component: ActionsViewModal,
} as Meta<typeof ActionsViewModal>;

export const Default = () => {
  // Mock render child function
  const renderChild = (props: any) => {
    return <div>{props.data}</div>;
  };

  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <ActionsViewModal
        renderChild={renderChild}
        queryName="sampleQuery"
        fetcher={mockFetcher}
      />
    </ModalExtendedWrapper>
  );
};
