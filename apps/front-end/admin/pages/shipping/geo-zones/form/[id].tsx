import React from "react";
import { NextPage } from "next";
import {
  ArrowRoundBack,
  Button,
  Divider,
  EditIcon,
  Input,
  InputRequiredStar,
  MinusIcon,
  PlusIcon,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  useAdminGetShippingTypeRule,
  useAdminUpdateShippingRuleTypeMutation,
} from "ui";
import { useRouting } from "routing";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

const GeoZoneForm: NextPage = () => {
  const { t } = useTranslation();
  const { back, getCurrentPath, visit, getParam } = useRouting();
  const id = getParam("id");

  const isNew = id === "new";
  const isEdit = !isNew;

  const { data } = useAdminGetShippingTypeRule(id);

  const { form, inputProps } = useForm<Parameters<typeof update>[0]>(
    {
      id,
      ...data,
    },
    { id, ...data }
  );
  const { mutate: update } = useAdminUpdateShippingRuleTypeMutation();

  return (
    <section>
      <div className="py-4 flex gap-1 justify-end">
        <Button center className="w-8 h-8">
          <SaveIcon className="fill-white" />
        </Button>
        <Button
          center
          className="w-8 h-8"
          onClick={() => back()}
          colorScheme="white"
        >
          <ArrowRoundBack />
        </Button>
      </div>

      <div className="border">
        <div className="p-4 border-b border-b-gray-300 flex items-center gap-2">
          <EditIcon />
          <p>{t("Edit Zone")}</p>
        </div>
        <div className="p-4">
          <Table
            TdProps={{ className: "odd:w-1/4 event:w-3/4" }}
            className="w-full"
          >
            <TBody>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  {t("Geo Zone Name")}
                </Td>
                <Td>
                  <Input {...inputProps("name")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  {t("Description")}
                </Td>
                <Td>
                  <Input {...inputProps("description")} />
                </Td>
              </Tr>
            </TBody>
          </Table>
          <p className="text-xl">{t("Geo Zones")}</p>
          <Divider />
          <Table
            TdProps={{ className: "border border-collapse" }}
            ThProps={{ align: "left", className: "border" }}
            className="w-full"
          >
            <THead>
              <Tr>
                <Th>{t("Country")}</Th>
                <Th>{t("Zone")}</Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(form.zones, ({ country, zone, id }) => (
                <Tr key={id}>
                  <Td>
                    <Select value={country}>
                      <SelectOption value={country}>{country}</SelectOption>
                    </Select>
                  </Td>
                  <Td>
                    <Select value={zone}>
                      <SelectOption value={zone}>{zone}</SelectOption>
                    </Select>
                  </Td>
                  <Td align="right">
                    <Button colorScheme="danger" center className="w-8 h-8">
                      <MinusIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td align="right">
                  <Button center className="w-8 h-8">
                    <PlusIcon />
                  </Button>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default GeoZoneForm;
