import { Formik, Form } from "formik";
import { useModalDisclouser } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Button,
  ModalFooter,
  FormikInput,
  Select,
  SelectOption,
  SelectProps,
  TranslationText,
  HStack,
  Textarea,
  Radio,
  useGetMyOrdersQuery,
  usePaginationControls,
  useAskForRefundMutation,
} from "@UI";
import { useAskForProductReturnMutation } from "@UI";
import { AskForReturnDto } from "dto";
import { FormOptionType } from "types";
import { AskForReturnValidationSchema } from "validation";
import { RefundType } from "@features/API";

export interface AskForReturnModalProps { }

export const AskForReturnModal: React.FC<AskForReturnModalProps> = ({ }) => {
  const { isOpen, handleClose, handleOpen } = useModalDisclouser();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { pagination, controls } = usePaginationControls();
  const { data, isLoading } = useGetMyOrdersQuery({
    pagination,
  });
  const { mutate } = useAskForRefundMutation();
  return (
    <Modal isOpen={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-4">
        <ModalHeader
          className="text-4xl"
          title={t("ask_for_reutrn", "Ask for return")}
        />
        <Formik<AskForReturnDto>
          onSubmit={(data, { resetForm }) => {
            mutate(
              {
                amount: 50.0,
                fullAmount: true,
                opened: true,
                orderItemId: "abc123",
                qty: 1,
                reason: "Product not as described",
                type: RefundType.Money,
              },
              {
                onSuccess: () => {
                  resetForm();
                  handleClose();
                },
              }
            );
          }}
          initialValues={{
            productId: "",
            reason: "",
            otherReason: "",
          }}
          validationSchema={AskForReturnValidationSchema}
        >
          {({ setFieldValue, values }) => {
            console.log(values);
            return (
              <Form className="flex flex-col gap-4">
                <FormikInput<SelectProps>
                  as={Select}
                  onOptionSelect={(v) => setFieldValue("productId", v)}
                  name="productId"
                  label={t("Product")}
                  placeholder={t("Select Product")}
                >
                  {data ? (
                    data.map((product) => (
                      <SelectOption value={product.id}>
                        {product.items
                          .map((v) => v.product?.title.slice(0, 15))
                          .join("...,")}
                      </SelectOption>
                    ))
                  ) : (
                    <></>
                  )}
                </FormikInput>
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-bold">
                    {t("I want to return this product because the item is")}
                  </span>
                  {ReturnReasons.map(({ name, value }, i) => (
                    <HStack key={i}>
                      <Radio id={`returnReason-${value}`} />
                      <label htmlFor={`returnReason-${value}`}>
                        <TranslationText translationObject={name} />
                      </label>
                    </HStack>
                  ))}
                  {values.reason === "other" ? (
                    <FormikInput
                      as={Textarea}
                      className="min-h-[10rem]"
                      label={t("let us know what went wrong")}
                      name="otherReason"
                    />
                  ) : null}
                </div>
                <ModalFooter>
                  <ModalCloseButton>
                    <Button colorScheme="white">{t("Cancel")}</Button>
                  </ModalCloseButton>
                  <Button type="submit" loading={isLoading}>
                    {t("Send Request")}
                  </Button>
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

const ReturnReasons: FormOptionType[] = [
  {
    name: {
      translationKey: "broken",
      fallbackText: "Broken",
    },
    value: "broken",
  },
  {
    name: {
      translationKey: "wrong_size",
      fallbackText: "Wrong Size",
    },
    value: "wrong size",
  },
  {
    name: {
      translationKey: "wrong_product",
      fallbackText: "Wrong Product",
    },
    value: "wrong product",
  },
  {
    name: {
      translationKey: "other",
      fallbackText: "Other",
    },
    value: "other",
  },
];
