import { Formik } from "formik";
import React from "react";
import { FlagIconCode } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,
  SaveIcon,
  ArrowRoundBack,
  Divider,
  SimpleTabHead,
  SimpleTabItemList,
  SimpleTabs,
  FlagIcon,
  Input,
  Textarea,
  FileInput,
  AspectRatioImage,
  EditIcon,
  TrashIcon,
  ExclamationCircleIcon,
  InputGroup,
  InputLeftElement,
  Select,
  SelectOption,
  PlusIcon,
  ListIcon,
  Table,
  THead,
  Th,
  Checkbox,
  ArrowUpIcon,
  ArrowDownIcon,
  TBody,
  Tr,
  Td,
  InputRequiredStar,
  MinusIcon,
  useGetServiceCategory,
  FormTranslationWrapper,
  getTranslationStateValue,
  setTranslationStateValue,
  ServiceCategoryFilterInput,
  useFormTranslationWrapper,
} from "ui";
import {
  mapArray,
  randomNum,
  runIfFn,
  WiaahLanguageCountriesIsoCodes,
} from "utils";
import { array, InferType, number, object, string } from "yup";
import {
  ServiceCategoryFilter,
  UpdateCategoryInput,
} from "@features/Services/Services/types";
import { useUpdateServiceCategory } from "@features/Services/Services/mutation";

const EditCategory = () => {
  const { getParam, back } = useRouting();
  const CategoryId: string = getParam("category_id");
  const { t } = useTranslation();
  const { data } = useGetServiceCategory(CategoryId);
  const { mutate } = useUpdateServiceCategory();
  const [lang, setLang] = React.useState<string>("en");
  const [form, setForm] = React.useState<UpdateCategoryInput>();

  function handleSave() {
    mutate(form);
  }

  const tabs: { name: string; comp: React.ReactNode }[] = [
    {
      name: t("General"),
      comp: (
        <div className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-8 text-right gap-16 flex-col w-full">
            <>
              <p>
                <span className="text-red-400 inline-block translate-y-1/4 px-2 transform font-bold text-2xl">
                  *
                </span>
                {t("Category Name")}
              </p>
              <Input
                value={getTranslationStateValue(form, "name", lang)}
                onChange={(e) =>
                  setForm((old) => ({
                    ...old,
                    name: setTranslationStateValue(
                      form,
                      "name",
                      e.target.value,
                      lang
                    ),
                  }))
                }
                className="col-span-7"
              />
              <p>{t("Description")}</p>
              <Textarea className="col-span-7" />
              <p>
                <span className="text-red-400 inline-block translate-y-1/4 px-2 transform font-bold text-2xl">
                  *
                </span>
                {t("Meta Tag Title")}
              </p>
              <Input className="col-span-7" />
              <p>{t("Meta Tag Description")}</p>
              <Textarea
                className="col-span-7"
                placeholder={t("Meta Tag Description")}
              />
              <p>{t("Meta Tag Keywords")}</p>
              <Textarea
                className="col-span-7"
                placeholder={t("Meta Tag Keywords")}
              />
            </>
          </div>
        </div>
      ),
    },
    {
      name: t("Data"),
      comp: (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-8 gap-16">
            <>
              <p className="font-bold">{t("Image")}</p>
              <div className="border-2 w-48 col-span-7 px-1 pt-1 pb-4 flex flex-col gap-2">
                <AspectRatioImage
                  ratio={1}
                  alt="image"
                  src={"/profile (3).jfif"}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FileInput innerProps={{}} accept="picture">
                    <div className="w-full px-4 py-2 text-white cursor-pointer rounded-md bg-primary items-center flex gap-1">
                      <EditIcon />
                      <p>{t("Edit")}</p>
                    </div>
                  </FileInput>
                  <Button
                    className="flex w-full items-center gap-1"
                    colorScheme="danger"
                  >
                    <TrashIcon />
                    <p>{t("Clear")}</p>
                  </Button>
                </div>
              </div>
              <p className="font-bold">{t("Sort Order")}</p>
              <Input className="col-span-7" placeholder={t("Sort Order")} />
              <p className="font-bold">{t("Status")}</p>
              <Select className="col-span-7" placeholder={t("Status")}>
                <SelectOption value={"active"}>{t("Active")}</SelectOption>
                <SelectOption value={"inActive"}>{t("InActive")}</SelectOption>
              </Select>
            </>
          </div>
        </div>
      ),
    },
    {
      name: t("SEO"),
      comp: (
        <div className="flex flex-col gap-4">
          <div className="p-4 text-sm lg:text-lg xl:text-xl flex gap-2 bg-primary-100">
            <p className="inline">
              <ExclamationCircleIcon className="inline mx-2" />
              {t(
                "Do not use spaces, instead replace spaces with - and make sur the SEO URL is globally unique."
              )}
            </p>
          </div>
          <div className="grid grid-cols-8">
            <p className="text-lg font-bold">{t("Keyword")}</p>
            <InputGroup className="w-full col-span-7">
              <InputLeftElement className="px-[0px]">
                <Select>
                  {mapArray(["GB", "FR", "DE", "ES"], (isoCode, i) => (
                    <SelectOption value={isoCode} key={i} className="w-12">
                      <FlagIcon code={isoCode} />
                    </SelectOption>
                  ))}
                </Select>
              </InputLeftElement>
              <Input className="w-full" />
            </InputGroup>
          </div>
        </div>
      ),
    },
    {
      name: t("Filters"),
      comp: (
        <ServiceCategoryFilterView
          value={form?.filters || []}
          onChange={(e) => setForm((v) => ({ ...v, filters: e }))}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between w-full items-center">
        <p className="font-bold text-xl">{t("Categories")}</p>
        <div className="flex items-center fill-white h-12 gap-1">
          <Button onClick={handleSave} className="w-12 h-full">
            <SaveIcon />
          </Button>
          <Button onClick={back} className="w-12 h-full">
            <ArrowRoundBack />
          </Button>
        </div>
      </div>
      <Divider />
      <div className="border pb-4">
        <div className="flex text-xl xl:text-2xl px-4 py-2 items-center gap-2">
          <EditIcon />
          <p className="font-semibold">{t("Edit Category")}</p>
        </div>
        <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <FormTranslationWrapper onLangChange={setLang} lang={lang}>
          <div className="px-4 flex flex-col gap-8 w-full">
            <SimpleTabs>
              <div className="flex items-center gap-4">
                <SimpleTabHead>
                  {mapArray(
                    ["GB", "FR", "DE", "ES"] as FlagIconCode[],
                    (v, i) =>
                      ({ onClick, selected }) =>
                        (
                          <div
                            key={i}
                            onClick={() => {
                              onClick();
                              setLang(v);
                            }}
                            className={`${
                              selected
                                ? "border-2 border-gray-300 border-b-white"
                                : ""
                            } px-8 py-2`}
                          >
                            <FlagIcon code={v} />
                          </div>
                        )
                  )}
                </SimpleTabHead>
              </div>
            </SimpleTabs>
            <SimpleTabs>
              <div className="flex border-b text-xl">
                <SimpleTabHead>
                  {mapArray(tabs, ({ name }, i) => (
                    <div
                      className={`${
                        i === 3 ? "border-b-white" : ""
                      } border px-8 py-2`}
                    >
                      {name}
                    </div>
                  ))}
                </SimpleTabHead>
              </div>
              <SimpleTabItemList>
                {mapArray(tabs, ({ comp }, i) => runIfFn(comp, { key: i }))}
              </SimpleTabItemList>
            </SimpleTabs>
          </div>
        </FormTranslationWrapper>
      </div>
    </div>
  );
};

export default EditCategory;

const FilterValuesValidationSchema = object({
  filterValues: array(
    object({
      filterName: string().required(),
      sortOrder: number().required(),
      countryIsoCode: string().required(),
    }).required()
  )
    .min(1)
    .required(),
}).required();

const ServiceCategoryFilterView: React.FC<{
  value: ServiceCategoryFilterInput[];
  onChange: (updated: ServiceCategoryFilterInput[]) => any;
}> = ({ onChange, value }) => {
  const { t } = useTranslation();
  const { visit, getCurrentPath, back } = useRouting();

  const [filterGroupAsc, setFilterGroupAsc] = React.useState<boolean>(false);
  const [EditId, setEditId] = React.useState<string>();
  const [lang, setLang] = React.useState<string>("en");
  const { lang: ctxLang } = useFormTranslationWrapper();
  const filterId = EditId;
  const filter = value.find((v) => (v.filteringKey = filterId));
  const edit = typeof EditId === "string";

  function handleChange() {}

  function handleEdit(id: string) {
    setEditId(id);
  }

  function handleCancelEdit() {
    setEditId(undefined);
  }

  return edit ? (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-xl">{t("Filters")}</p>
        <div className="text-lg items-stretch h-12 gap-1 flex">
          <Button
            onClick={handleCancelEdit}
            className="text-black"
            colorScheme="white"
          >
            <ArrowRoundBack />
          </Button>
        </div>
      </div>

      <div className="border flex flex-col gap-2">
        <div className="flex text-xl font-semibold gap-2 items-center">
          <EditIcon />
          <p>{filterId ? t("Edit Filter") : t("Add Filter")}</p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="text-2xl my-4 border-b">
            <p>{t("Filter Group")}</p>
          </div>

          <div className="grid grid-cols-8 gap-8">
            <p className="text-xl font-bold text-right">
              <InputRequiredStar />
              {t("Filter Group Name")}
            </p>
            <InputGroup className="col-span-7 h-fit">
              <InputLeftElement className="px-[0px]">
                <Select onOptionSelect={(v) => setLang(v)} className="h-full">
                  {mapArray(WiaahLanguageCountriesIsoCodes, (code, i) => (
                    <SelectOption className="h-full" value={code} key={i}>
                      <FlagIcon code={code} />
                    </SelectOption>
                  ))}
                </Select>
              </InputLeftElement>
              <Input
                onChange={(v) => {
                  onChange([
                    ...value.filter(
                      (v) => v.filteringKey !== filter.filteringKey
                    ),
                    {
                      ...filter,
                      filterGroupName: setTranslationStateValue(
                        filter,
                        "filterGroupName",
                        v.target.value,
                        lang
                      ),
                    },
                  ]);
                }}
              />
            </InputGroup>
            <p className="font-bold text-xl text-right">{t("Sort Order")}</p>
            <Input className="col-span-7 h-12" type={"number"} />
          </div>
        </div>

        <div className="flex flex-col border p-4 gap-4 border-b w-full">
          <p className="text-2xl border-b">{t("Filter Values")}</p>

          <Table ThProps={{ align: "left", className: "border" }}>
            <THead>
              <Th>
                <p className="text-xl font-bold">
                  <InputRequiredStar />
                  {t("Filter Name")}
                </p>
              </Th>
              <Th>{t("Sort Order")}</Th>
              <Th></Th>
            </THead>

            <TBody>
              <Formik<InferType<typeof FilterValuesValidationSchema>>
                validationSchema={FilterValuesValidationSchema}
                initialValues={{
                  filterValues: [],
                }}
                onSubmit={() => {}}
              >
                {({ values, setFieldValue, handleChange }) => {
                  return (
                    <>
                      {mapArray(
                        values.filterValues,
                        ({ filterName, sortOrder, countryIsoCode }, idx) => (
                          <Tr key={idx}>
                            <Td>
                              <InputGroup className="col-span-7">
                                <InputLeftElement className="px-[0px]">
                                  <Select
                                    value={
                                      countryIsoCode.length > 0
                                        ? countryIsoCode
                                        : "GB"
                                    }
                                    onOptionSelect={(v) =>
                                      setFieldValue("countryIsoCode", v)
                                    }
                                    className="h-full"
                                  >
                                    {mapArray(
                                      WiaahLanguageCountriesIsoCodes,
                                      (code, i) => (
                                        <SelectOption
                                          className="h-full"
                                          value={code}
                                          key={i}
                                        >
                                          <FlagIcon code={code} />
                                        </SelectOption>
                                      )
                                    )}
                                  </Select>
                                </InputLeftElement>
                                <Input />
                              </InputGroup>
                            </Td>
                            <Td>
                              <Input type={"number"} />
                            </Td>
                            <Td align="right">
                              <Button
                                onChange={() =>
                                  setFieldValue(
                                    "filterValues",
                                    values.filterValues.filter(
                                      (_, i) => i !== idx
                                    )
                                  )
                                }
                                colorScheme="danger"
                                className="w-12 h-12 flex justify-center items-center"
                              >
                                <span className="fill-black  text-black flex justify-center items-center bg-white rounded-full">
                                  <MinusIcon />
                                </span>
                              </Button>
                            </Td>
                          </Tr>
                        )
                      )}
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td align="right">
                          <Button
                            onClick={() =>
                              setFieldValue("filterValues", [
                                ...values.filterValues,
                                {
                                  countryIsoCode: "GB",
                                  filterName: "",
                                  sortOrder: 1,
                                },
                              ])
                            }
                            className="text-white flex justify-center items-center text-2xl h-12 w-12"
                          >
                            <PlusIcon />
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  );
                }}
              </Formik>
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">{t("Filters")}</p>
        <div className="text-xl h-12 items-stretch flex gap-1 ">
          <Button
            onClick={() =>
              visit((r) =>
                r.addPath(getCurrentPath({ noParams: true })).addPath("form")
              )
            }
          >
            <PlusIcon />
          </Button>
          <Button colorScheme="danger">
            <TrashIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 border">
        <div className="px-4 text-lg py-2 border-b flex items-center gap-2">
          <ListIcon />
          <p>{t("Filter List")}</p>
        </div>

        <Table
          ThProps={{ align: "right" }}
          TdProps={{ align: "right", className: "border lg:min-w-[12rem]" }}
        >
          <THead>
            <Th className="text-primary">
              <div className="flex gap-2">
                <Checkbox />
                <div
                  onClick={() => setFilterGroupAsc((v) => !v)}
                  className="flex items-center gap-1"
                >
                  <p>{t("Filter Group")}</p>
                  <span className="text-xl">
                    {filterGroupAsc ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </span>
                </div>
              </div>
            </Th>
            <Th className="text-primary">{t("Sort Order")}</Th>
            <Th>{t("Action")}</Th>
          </THead>
          <TBody>
            {mapArray(value, ({ sortOrder, filteringKey, ...rest }) => (
              <Tr>
                <Td className="w-full">
                  <div className="flex gap-2">
                    <Checkbox className="inline-block" />
                    <p>
                      {getTranslationStateValue(
                        rest,
                        "filterGroupName",
                        ctxLang
                      )}
                    </p>
                  </div>
                </Td>
                <Td>{sortOrder}</Td>
                <Td>
                  <div className="w-fit h-12 text-lg flex items-stretch gap-1">
                    <Button>
                      <EditIcon onClick={() => handleEdit(filteringKey)} />
                    </Button>
                    <Button colorScheme="danger">
                      <TrashIcon />
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};
