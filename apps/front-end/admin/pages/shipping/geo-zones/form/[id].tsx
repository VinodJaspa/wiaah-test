import React from "react";
import { NextPage } from "next";
import {
  ArrowRoundBack,
  Button,
  Divider,
  EditIcon,
  GetShippingTypeRuleQuery,
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
import { ShippingType } from "@features/API";
import Head from "next/head";

const GeoZoneForm: NextPage = () => {
  const { t } = useTranslation();
  const { back, getCurrentPath, visit, getParam } = useRouting();
  const id = getParam("id");

  const isNew = id === "new";
  const isEdit = !isNew;

  // NOTE: graphql is not ready
  const { data: _data } = useAdminGetShippingTypeRule(id ?? "");
  const data = FAKE_SHIPPING_TYPE;

  const { form, inputProps } = useForm<Parameters<typeof update>[0]>(
    {
      ...data,
    },
    { ...data },
  );
  const { mutate: update } = useAdminUpdateShippingRuleTypeMutation();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Geo Zones Form </title>
      </Head>
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
                {form?.zones && form?.zones.length > 0
                  ? mapArray(form.zones, ({ country, zone, id }) => (
                      <Tr key={id}>
                        <Td>
                          <Select value={country ?? ""}>
                            <SelectOption value={country}>
                              {country}
                            </SelectOption>
                          </Select>
                        </Td>
                        <Td>
                          <Select value={zone ?? ""}>
                            <SelectOption value={zone}>{zone}</SelectOption>
                          </Select>
                        </Td>
                        <Td align="right">
                          <Button
                            colorScheme="danger"
                            center
                            className="w-8 h-8"
                          >
                            <MinusIcon />
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  : null}

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
    </React.Fragment>
  );
};

export default GeoZoneForm;

const FAKE_SHIPPING_TYPE: GetShippingTypeRuleQuery["getShippingTypeRule"] = {
  __typename: "ShippingTypeRule",
  id: "1",
  name: "Standard Shipping",
  type: ShippingType.Free,
  description: "Standard shipping rules for international orders.",
  zones: [
    {
      __typename: "ShippingRuleGeoZone",
      id: "zone1",
      shippingTypeRuleId: "1",
      country: "US",
      zone: "North America",
    },
    {
      __typename: "ShippingRuleGeoZone",
      id: "zone2",
      shippingTypeRuleId: "1",
      country: "CA",
      zone: "North America",
    },
    {
      __typename: "ShippingRuleGeoZone",
      id: "zone3",
      shippingTypeRuleId: "1",
      country: "GB",
      zone: "Europe",
    },
  ],
};
