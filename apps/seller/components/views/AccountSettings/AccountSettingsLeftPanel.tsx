import { Divider, Flex, StackProps, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { BiKey } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AccountSettingsPanel } from "types";
import { TranslationText } from "ui";

export interface AccountSettingsLeftPanelProps {
  innerProps?: StackProps;
  panelsInfo: Omit<AccountSettingsPanel, "panelComponent">[];
  onPanelClick?: (panelLink: string) => any;
  currentActive?: string;
}

export const AccountSettingsLeftPanel: React.FC<AccountSettingsLeftPanelProps> =
  ({ innerProps, panelsInfo, onPanelClick, currentActive }) => {
    return (
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
              gap="1rem"
            >
              <Icon mt="0.25em" fontSize={"lg"} as={panelIcon} />
              <Flex direction={"column"}>
                <TranslationText
                  fontWeight={"bold"}
                  translationObject={panelName}
                />
                {/* <TranslationText translationObject={panelDescription} /> */}
              </Flex>
            </Flex>
          ))}
      </Stack>
    );
  };

// const settings: AccountSettingsPanel[] = [
//   {
//     panelName: {
//       fallbackText: "Account",
//       translationKey: "account",
//     },
//     panelIcon: FiSettings,
//     panelUrl: "/account",
//     // panelDescription: {
//     //   translationKey: "settings_account_description",
//     //   fallbackText:
//     //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
//     // },
//     panelComponent: () => <div></div>,
//   },
//   {
//     panelName: {
//       fallbackText: "Password",
//       translationKey: "password",
//     },
//     panelIcon: BiKey,
//     panelUrl: "/password",
//     // panelDescription: {
//     //   translationKey: "settings_password_description",
//     //   fallbackText:
//     //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
//     // },
//     panelComponent: () => <div></div>,
//   },
//   {
//     panelName: {
//       fallbackText: "Notification",
//       translationKey: "notification",
//     },
//     panelIcon: IoNotificationsOutline,
//     panelUrl: "/notifications",
//     // panelDescription: {
//     //   translationKey: "settings_notifications_description",
//     //   fallbackText: "Lorem Ipsum is simply dummy text",
//     // },
//     panelComponent: () => <div></div>,
//   },
// ];
