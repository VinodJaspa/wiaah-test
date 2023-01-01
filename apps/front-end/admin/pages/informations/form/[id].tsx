import { Formik } from "formik";
import React from "react";
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
  EditIcon,
  ExclamationCircleIcon,
  InputGroup,
  InputLeftElement,
  Select,
  SelectOption,
} from "ui";
import { mapArray, runIfFn, WiaahLanguageCountriesIsoCodes } from "utils";

const EditInfo = () => {
  const { getParam, back } = useRouting();
  const CategoryId: string = getParam("category_id");
  const { t } = useTranslation();

  const tabs: { name: string; comp: React.ReactNode }[] = [
    {
      name: t("General"),
      comp: (
        <div className="flex flex-col gap-8 w-full">
          <SimpleTabs>
            <div className="flex items-center">
              <SimpleTabHead>
                {mapArray(WiaahLanguageCountriesIsoCodes, (v, i) => (
                  <div
                    className={`${
                      i === 0 ? "border-2 border-gray-300 border-b-white" : ""
                    } px-8 py-2`}
                    key={i}
                  >
                    <FlagIcon code={v} />
                  </div>
                ))}
              </SimpleTabHead>
            </div>
            <SimpleTabItemList>
              <div className="grid grid-cols-8 text-right gap-16 flex-col w-full">
                <Formik initialValues={{}} onSubmit={() => {}}>
                  {() => (
                    <>
                      <p>
                        <span className="text-red-400 inline-block translate-y-1/4 px-2 transform font-bold text-2xl">
                          *
                        </span>
                        {t("Information Title")}
                      </p>
                      <Input className="col-span-7" />
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
                      <p>{t("Sort Order")}</p>
                      <Input
                        className="col-span-7"
                        placeholder={t("Sort Order")}
                      />
                      <p>{t("Status")}</p>
                      <Select>
                        <SelectOption value={"enabled"}>
                          {t("Enabled")}
                        </SelectOption>
                        <SelectOption value={"disabled"}>
                          {t("Disabled")}
                        </SelectOption>
                      </Select>
                    </>
                  )}
                </Formik>
              </div>
            </SimpleTabItemList>
          </SimpleTabs>
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
                  {mapArray(WiaahLanguageCountriesIsoCodes, (isoCode, i) => (
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
          <Button className="w-12 h-full">
            <SaveIcon />
          </Button>
          <Button className="w-12 h-full">
            <ArrowRoundBack onClick={() => back()} />
          </Button>
        </div>
      </div>
      <Divider />
      <div className="border pb-4">
        <div className="flex text-xl xl:text-2xl px-4 py-2 items-center gap-2">
          <EditIcon />
          <p className="font-semibold">{t("Edit Information")}</p>
        </div>
        <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <div className="px-4 flex flex-col gap-8 w-full">
          <SimpleTabs>
            <div className="flex border-b text-xl">
              <SimpleTabHead>
                {mapArray(tabs, ({ name }, i) => (
                  <div
                    className={`${
                      i === 2 ? "border-b-white" : ""
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
      </div>
    </div>
  );
};

export default EditInfo;
