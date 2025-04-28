import { useSocialControls } from "@blocks";
import {
  Button,
  Drawer,
  DrawerContent,
  EmailIcon,
  Input,
  InputGroup,
  InputLeftElement,
  PersonIcon,
} from "@partials";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";

export const NewsletterDrawer: React.FC = () => {
  const { hideNewsletterRegisteration, value } = useSocialControls(
    "showNewsletterRegisteration"
  );
  const isOpen = value === true;
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={hideNewsletterRegisteration}
      full
      position="bottom"
    >
      <DrawerContent>
        <div className="flex flex-col">
          <SectionHeader sectionTitle={t("Newsletter")} />
          <div className="flex h-full justify-center items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center text-center gap-3">
                <p className="text-2xl font-med">
                  {t("Stay up to date with Wiaah")}
                </p>
                <p>
                  {t(
                    "Subscribe to our newsletter for latest news and product updates straight to your inbox"
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <InputGroup>
                  <InputLeftElement>
                    <EmailIcon />
                  </InputLeftElement>
                  <Input placeholder={t("Type here...")} />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement>
                    <PersonIcon />
                  </InputLeftElement>
                  <Input placeholder={t("Type here...")} />
                </InputGroup>
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <Button className="w-full">{t("Subscribe")}</Button>
                <p className="text-sm text-center">
                  {t("Wiaah respects your privacy, No spam!")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
