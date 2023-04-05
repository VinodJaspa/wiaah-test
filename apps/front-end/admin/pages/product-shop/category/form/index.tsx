import { CreateCategoryInput, ProductCategoryStatus } from "@features/API";
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
  FormTranslationWrapper,
  useGetAdminProductCategoriesQuery,
  useUpdateProductCategoryMutation,
  useCreateProductCategory,
} from "ui";
import {
  WiaahLanguageCountries,
  WiaahLanguageCountriesIsoCodes,
  mapArray,
  runIfFn,
  useForm,
} from "utils";

const EditCategory = () => {
  const { getParam, back } = useRouting();
  const CategoryId: string = getParam("category_id");
  const { t } = useTranslation();
  const { form, inputProps, selectProps, translationInputProps, handleChange } =
    useForm<Partial<CreateCategoryInput>>({});
  const [lang, changeLang] = React.useState<string>(
    WiaahLanguageCountriesIsoCodes.at(0)
  );

  const { data: cates } = useGetAdminProductCategoriesQuery({
    pagination: {
      page: 1,
      take: 1000,
    },
  });
  const { mutate: updateCate } = useUpdateProductCategoryMutation();
  const { mutate: createCate } = useCreateProductCategory();
  const handleSubmit = () => {
    if (CategoryId) {
      updateCate({ ...form, id: CategoryId });
    } else {
      createCate(form as Required<typeof form>);
    }
  };

  const tabs: { name: string; comp: React.ReactNode }[] = [
    {
      name: t("General"),
      comp: (
        <div className="grid grid-cols-8 text-right gap-16 flex-col w-full">
          <>
            <p className="col-span-1">
              <span className="text-red-400 inline-block translate-y-1/4 px-2 transform font-bold text-2xl">
                *
              </span>
              {t("Category Name")}
            </p>
            <div className="col-span-7">
              <Input
                {...translationInputProps("name", lang)}
                className={"col-span-7"}
              />
            </div>
            <p className="col-span-1">{t("Description")}</p>
            <Textarea className="col-span-7" />
            <p className="col-span-1">
              <span className="text-red-400 inline-block translate-y-1/4 px-2 transform font-bold text-2xl">
                *
              </span>
              {t("Meta Tag Title")}
            </p>
            <div className="col-span-7">
              <Input {...translationInputProps("")} />
            </div>
            <p className="col-span-1">{t("Meta Tag Description")}</p>
            <Textarea
              className="col-span-7"
              placeholder={t("Meta Tag Description")}
            />
            <p className="col-span-1">{t("Meta Tag Keywords")}</p>
            <Textarea
              className="col-span-7"
              placeholder={t("Meta Tag Keywords")}
            />
          </>
        </div>
      ),
    },
    {
      name: t("Data"),
      comp: (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-8 gap-16">
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ values, setFieldValue }) => (
                <>
                  <p className="font-bold">{t("Parant")}</p>
                  <Select
                    className="col-span-7"
                    placeholder={t("Parent")}
                    value={form?.parantId || ""}
                    {...inputProps("parantId")}
                  >
                    {mapArray(cates, ({ id, name }) => (
                      <SelectOption value={id}>{name}</SelectOption>
                    ))}
                  </Select>
                  <p className="font-bold">{t("Image")}</p>
                  <div className="border-2 w-48 col-span-7 px-1 pt-1 pb-4 flex flex-col gap-2">
                    <AspectRatioImage
                      ratio={1}
                      alt="image"
                      src={"/profile (3).jfif"}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <FileInput
                        innerProps={{
                          onChange: (e) =>
                            setFieldValue("image", e.target.files[0]),
                        }}
                        accept="picture"
                      >
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
                  <Input
                    type="number"
                    {...inputProps("sortOrder")}
                    className="col-span-7"
                    placeholder={t("Sort Order")}
                  />
                  <p className="font-bold">{t("Status")}</p>
                  <Select
                    {...selectProps("status")}
                    className="col-span-7"
                    placeholder={t("Status")}
                  >
                    <SelectOption value={"active"}>{t("Active")}</SelectOption>
                    <SelectOption value={"inActive"}>
                      {t("InActive")}
                    </SelectOption>
                  </Select>
                </>
              )}
            </Formik>
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
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between w-full items-center">
        <p className="font-bold text-xl">{t("Categories")}</p>
        <div className="flex items-center fill-white h-12 gap-1">
          <Button onClick={handleSubmit} className="w-12 h-full">
            <SaveIcon />
          </Button>
          <Button onClick={() => back()} className="w-12 h-full">
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
        <div className="px-4 flex flex-col gap-8 w-full">
          <SimpleTabs>
            <div className="flex items-center">
              <SimpleTabHead>
                {mapArray(
                  WiaahLanguageCountriesIsoCodes as FlagIconCode[],
                  (v, i) =>
                    ({ onClick, selected }) =>
                      (
                        <div
                          onClick={() => {
                            onClick && onClick();
                            changeLang(v);
                          }}
                          className={`${
                            selected
                              ? "border-2 border-gray-300 border-b-white"
                              : ""
                          } px-8 py-2`}
                          key={i}
                        >
                          <FlagIcon code={v} />
                        </div>
                      )
                )}
              </SimpleTabHead>
            </div>
          </SimpleTabs>
          <FormTranslationWrapper onLangChange={changeLang} lang={lang}>
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
          </FormTranslationWrapper>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
