import { Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormikInput } from "ui";

export interface PasswordSectionProps {}

export const PasswordSection: React.FC<PasswordSectionProps> = () => {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form style={{ width: "100%" }}>
          <Flex gap="1rem" direction={"column"}>
            <Text fontSize={"xx-large"} fontWeight="bold">
              {t("password", "Password")}
            </Text>
            <FormikInput
              label={{
                translationKey: "current_password",
                fallbackText: "Current Password",
              }}
              name="currentPassword"
            />
            <FormikInput
              label={{
                translationKey: "new_password",
                fallbackText: "New Password",
              }}
              name="newPassword"
            />
            <FormikInput
              label={{
                translationKey: "confirm_password",
                fallbackText: "Confirm Password",
              }}
              name="confirmPassword"
            />
          </Flex>
          <HStack
            justifyContent={"space-between"}
            my="1rem"
            w="100%"
            justify={"end"}
            px="1rem"
          >
            <Text color={"primary.main"}>
              {t("forgot_password", "Forgot Password")}
            </Text>
            <Button>{t("change_password", "Change Password")}</Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};
