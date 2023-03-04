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
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm, WiaahLanguageCountries } from "utils";
import { useRouting } from "routing";
import { ProfessionStatus } from "@features/API";

const addProfession: NextPage = () => {
  const { t } = useTranslation();
  const { back, getParam } = useRouting();

  const id = getParam("id");

  const isNew = id === "new";

  const {
    form: updateForm,
    inputProps: updateprops,
    selectProps: updateselect,
  } = useForm<Parameters<typeof update>[0]>({ id });
  const {
    form: createForm,
    inputProps: createprops,
    selectProps: createselect,
  } = useForm<Parameters<typeof create>[0]>({
    sortOrder: 0,
    status: ProfessionStatus.InActive,
    title: "",
  });

  const { mutate: update } = useAdminUpdateProfessionMutation();
  const { mutate: create } = useAdminCreateProfessionMutation();

  const inputProps = isNew ? createprops : updateprops;
  const selectProps = isNew ? createselect : updateselect;

  return (
    <section>
      <AdminListTable
        onBack={() => back()}
        onSave={() => (isNew ? create(createForm) : update(updateForm))}
        data={[]}
        headers={[]}
        title={t("Edit")}
      >
        <div className="grid grid-cols-4 gap-4">
          <HStack>
            <InputRequiredStar />
            <p>{t("Profession Name")}</p>
          </HStack>
          <InputGroup className="col-span-3">
            <InputLeftElement>
              <Select className="p-[0px] w-[5rem] border-[0px]">
                {WiaahLanguageCountries.map(({ code }) => (
                  <SelectOption value={code}>
                    <FlagIcon code={code} />
                  </SelectOption>
                ))}
              </Select>
            </InputLeftElement>
            <Input
              {...inputProps("title")}
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
            {Object.values(ProfessionStatus).map((v) => (
              <SelectOption value={v}>{v}</SelectOption>
            ))}
          </Select>
        </div>
      </AdminListTable>
    </section>
  );
};

export default addProfession;
