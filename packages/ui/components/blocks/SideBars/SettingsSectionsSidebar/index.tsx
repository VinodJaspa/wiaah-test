import { Divider, Flex, StackProps, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { SettingsSectionType } from "types";
import { TranslationText } from "ui";

export interface SettingsSectionsSidebarProps {
  innerProps?: StackProps;
  panelsInfo: Omit<SettingsSectionType, "panelComponent">[];
  onPanelClick?: (panelLink: string) => any;
  currentActive?: string | null;
}

export const SettingsSectionsSidebar: React.FC<SettingsSectionsSidebarProps> =
  ({ innerProps, panelsInfo, onPanelClick, currentActive }) => {
    return (
      //@ts-ignore
      <Stack
        spacing={"0px"}
        divider={<Divider borderWidth={"1px"} borderColor={"primary.100"} />}
        borderRightWidth={"1px"}
        borderColor="primary.100"
        {...innerProps}
      >
        {Array.isArray(panelsInfo) &&
          panelsInfo.map(({ panelIcon, panelName, panelUrl }, i) => (
            <Flex
              cursor={"pointer"}
              onClick={() => onPanelClick && onPanelClick(panelUrl)}
              _hover={{ bgColor: "primary.light" }}
              bgColor={currentActive === panelUrl ? "primary.50" : "unset"}
              p="1rem"
              className="px-8 items-center"
              gap="1rem"
            >
              <Icon mt="0.25em" fontSize={"lg"} as={panelIcon} />
              <Flex direction={"column"}>
                <TranslationText
                  className="font-bold"
                  translationObject={panelName}
                />
                {/* <TranslationText translationObject={panelDescription} /> */}
              </Flex>
            </Flex>
          ))}
      </Stack>
    );
  };
