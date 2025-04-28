import { useSocialControls } from "@blocks";
import {
  Button,
  CloseIcon,
  Divider,
  Drawer,
  DrawerContent,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SaveFlagOutlineIcon,
  SearchIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialMusicSearchDrawer: React.FC = () => {
  const { closeMusicSearch, value } = useSocialControls("showMusicSearch");
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  return (
    <Drawer position="bottom" full isOpen={!!value} onClose={closeMusicSearch}>
      <DrawerContent className="p-4 bg-black bg-opacity-60 blur-sm">
        <div className="flex flex-col gap-4">
          <HStack>
            <InputGroup className="w-full text-white bg-white bg-opacity-40 blur-sm rounded-full">
              <InputLeftElement>
                <div className="bg-white rounded-full w-8 h-8 flex justify-center items-center">
                  <SearchIcon />
                </div>
              </InputLeftElement>
              <Input />
              <InputRightElement>
                <CloseIcon className="text-white" />
              </InputRightElement>
            </InputGroup>

            <p
              onClick={() => closeMusicSearch()}
              className="cursor-pointer text-lg font-medium text-white"
            >
              {t("Cancel")}
            </p>
          </HStack>
          <Button colorScheme="white" className="w-full">
            {t("Upload from device")}
          </Button>

          <HStack>
            <div className="w-9 h-9 bg-white bg-opacity-40 rounded-full">
              <SaveFlagOutlineIcon />
            </div>

            <Divider variant="vert" />

            {[t("For you"), t("Popular"), t("Heavy metal"), t("Rock")].map(
              (v, i) => (
                <div
                  key={i}
                  className="w-9 h-9 text-xs bg-white bg-opacity-40 rounded-full"
                >
                  {v}
                </div>
              )
            )}
          </HStack>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
