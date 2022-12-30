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
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { countries, WiaahLanguageCountries } from "utils";
import { useRouting } from "routing";

const addProfession: NextPage = () => {
  const { t } = useTranslation();
  const { back } = useRouting();
  return (
    <section>
      <AdminListTable
        onBack={() => back()}
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
            <Input placeholder={t("Profession name")} />
          </InputGroup>
          <HStack>
            <InputRequiredStar />
            <p>{t("Sort order")}</p>
          </HStack>
          <Input
            placeholder={t("Sort Order")}
            className="col-span-3"
            type="number"
          />
        </div>
      </AdminListTable>
    </section>
  );
};

export default addProfession;
