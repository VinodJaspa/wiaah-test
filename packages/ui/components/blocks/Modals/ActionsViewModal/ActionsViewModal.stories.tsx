import React from "react";
import {
  ActionsViewModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

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
  title: storybookModalsTitle + "ActionsViewModal",
  component: ActionsViewModal,
} as ComponentMeta<typeof ActionsViewModal>;

// Define the story itself
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
