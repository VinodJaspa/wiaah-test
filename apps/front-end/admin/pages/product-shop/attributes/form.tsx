import {
  Button,
  FlagIcon,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRequiredStar,
  PlusIcon,
  Select,
  SelectOption,
  TBody,
  Table,
  Td,
  Th,
  Tr,
  TrashIcon,
  useAdminCreateProductAttributeMutation,
  useAdminUpdateProductAttributeMutation,
} from "@UI";
import { AdminListTable } from "@blocks";
import {
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
} from "@features/API";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { WiaahLangId, WiaahLanguageCountries, mapArray, useForm } from "utils";

const ProductShopAttributeForm = () => {
  const { t } = useTranslation();
  const { back, getQuery } = useRouting();
  const { id } = getQuery();
  const [lang, setLang] = useState<WiaahLangId>(WiaahLangId.EN);

  const isNew = typeof id !== "string";

  const {
    form: updateForm,
    inputProps: updateprops,
    selectProps: updateselect,
    translationInputProps: updateTranslationInputProps,
    handleChange: updateHandleChange,
  } = useForm<Parameters<typeof update>[0]>({ id });

  const {
    form: createForm,
    inputProps: createprops,
    selectProps: createselect,
    translationInputProps: createTranslationInputProps,
    handleChange: createHandleChange,
  } = useForm<Parameters<typeof create>[0]>({
    displayType: ProductAttributeDisplayType.Text,
    name: [],
    selectionType: ProductAttributeSelectionType.Single,
    values: [],
  });

  const { mutate: create } = useAdminCreateProductAttributeMutation();
  const { mutate: update } = useAdminUpdateProductAttributeMutation();

  const form = isNew ? createForm : updateForm;
  const inputProps = isNew ? createprops : updateprops;
  const handleChange = isNew ? createHandleChange : updateHandleChange;
  const selectProps = isNew ? createselect : updateselect;
  const translationInput = isNew
    ? createTranslationInputProps
    : updateTranslationInputProps;

  return (
    <section>
      <AdminListTable
        onBack={() => back()}
        onSave={() => (isNew ? create(createForm) : update(updateForm))}
        data={[]}
        headers={[]}
        title={isNew ? t("New") : t("Edit")}
      >
        <div className="grid grid-cols-4 gap-4">
          <HStack>
            <InputRequiredStar />
            <p>{t("Attribute Name")}</p>
          </HStack>
          <InputGroup className="col-span-3">
            <InputLeftElement>
              <Select
                value={lang}
                onOptionSelect={(v: WiaahLangId) => setLang(v)}
                className="p-[0px] w-[5rem] border-[0px]"
              >
                {WiaahLanguageCountries.map(({ langId, code }) => (
                  <SelectOption value={langId}>
                    <FlagIcon code={code} />
                  </SelectOption>
                ))}
              </Select>
            </InputLeftElement>
            <Input
              {...translationInput("name", lang)}
              placeholder={t("Attribute name")}
            />
          </InputGroup>
          <HStack>
            <InputRequiredStar />
            <p>{t("Display type")}</p>
          </HStack>
          <div className="col-span-3">
            <Select {...selectProps("displayType")} className="col-span-3">
              {mapArray(
                Object.values(ProductAttributeDisplayType),
                (type, i) => (
                  <SelectOption key={i} value={type}>
                    {type}
                  </SelectOption>
                )
              )}
            </Select>
          </div>

          <HStack>
            <InputRequiredStar />
            <p>{t("Selection type")}</p>
          </HStack>
          <div className="col-span-3">
            <Select {...selectProps("selectionType")}>
              {mapArray(
                Object.values(ProductAttributeSelectionType),
                (type, i) => (
                  <SelectOption key={i} value={type}>
                    {type}
                  </SelectOption>
                )
              )}
            </Select>
          </div>

          <div className="col-span-4 w-full">
            <Table className="w-full">
              <Tr>
                <Th>{t("Name")}</Th>
                <Th>{t("value")}</Th>
                <Th>{t("action")}</Th>
              </Tr>
              <TBody>
                <div>
                  {mapArray(updateForm?.values, (value, i) => (
                    <Tr>
                      <Td>
                        <Input />
                      </Td>
                      <Td>
                        {form?.displayType ===
                        ProductAttributeDisplayType.Color ? (
                          <input
                            className="w-full h-12 rounded-3xl"
                            type="color"
                          />
                        ) : (
                          <Input />
                        )}
                      </Td>
                      <Td>
                        <HStack className="justify-center">
                          <Button
                            colorScheme="danger"
                            className="p-2"
                            onClick={() =>
                              handleChange(
                                "values",
                                createForm?.values?.filter(
                                  (v) => v.id === value.id
                                )
                              )
                            }
                            center
                          >
                            <TrashIcon className="text-xl" />
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td colSpan={2}></Td>
                    <Td>
                      <HStack className="justify-center">
                        <Button
                          center
                          className="p-2"
                          onClick={() =>
                            handleChange("values", [
                              ...createForm?.values,
                              { name: [], value: "", id: "" },
                            ])
                          }
                        >
                          <PlusIcon className="text-xl" />
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                </div>
              </TBody>
            </Table>
          </div>
        </div>
      </AdminListTable>
    </section>
  );
};

export default ProductShopAttributeForm;
