import { AdminListTable } from "@components";
import {
  FlagIcon,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRequiredStar,
  Select,
  SelectOption,
  useAdminCreateProfessionMutation,
  useAdminUpdateProfessionMutation,
} from "ui";
import { NextPage } from "next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, WiaahLangId, WiaahLanguageCountries } from "utils";
import { useRouting } from "routing";
import { ProfessionStatus } from "@features/API";
import Head from "next/head";

const AddProfession: NextPage = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();
  const { back, getParam } = useRouting();

  const [lang, setLang] = useState<WiaahLangId>(WiaahLangId.EN);
  const id = getParam("id");

  const isNew = id === "new";

  const {
    form: updateForm,
    inputProps: updateprops,
    selectProps: updateselect,
    translationInputProps: updateTranslationInputProps,
  } = useForm<Parameters<typeof update>[0]>({ id });
  const {
    form: createForm,
    inputProps: createprops,
    selectProps: createselect,
    translationInputProps: createTranslationInputProps,
  } = useForm<Parameters<typeof create>[0]>({
    sortOrder: 0,
    status: ProfessionStatus.InActive,
    title: "",
  });

  const { mutate: update } = useAdminUpdateProfessionMutation();
  const { mutate: create } = useAdminCreateProfessionMutation();

  const inputProps = isNew ? createprops : updateprops;
  const selectProps = isNew ? createselect : updateselect;
  const translationInput = isNew
    ? createTranslationInputProps
    : updateTranslationInputProps;

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Edit Profession Form </title>
      </Head>
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
              <p>{t("Profession Name")}</p>
            </HStack>
            <InputGroup className="col-span-3">
              <InputLeftElement>
                <Select
                  value={lang}
                  onOptionSelect={(v: WiaahLangId) => setLang(v)}
                  className="p-[0px] w-[5rem] border-[0px]"
                >
                  {WiaahLanguageCountries.map(({ code }) => (
                    <SelectOption key={code} value={code}>
                      <FlagIcon code={code} />
                    </SelectOption>
                  ))}
                </Select>
              </InputLeftElement>
              <Input
                {...translationInput("title", lang)}
                placeholder={t("Profession name")}
              />
            </InputGroup>
            <HStack>
              <InputRequiredStar />
              <p>{t("Sort order")}</p>
            </HStack>
            <Input
              {...inputProps("sortOrder")}
              placeholder={t("Sort Order")}
              className="col-span-3"
              type="number"
            />

            <HStack>
              <InputRequiredStar />
              <p>{t("Status")}</p>
            </HStack>
            <Select
              {...selectProps("status")}
              placeholder={t("Sort Order")}
              className="col-span-3"
            >
              {Object.values(ProfessionStatus).map((v, i) => (
                <SelectOption key={i} value={v}>
                  {v}
                </SelectOption>
              ))}
            </Select>
          </div>
        </AdminListTable>
      </section>
    </React.Fragment>
  );
};

export default AddProfession;
