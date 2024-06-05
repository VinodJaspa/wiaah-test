import {
  AddBadgeButton,
  ArrowRoundBack,
  Button,
  EditIcon,
  HStack,
  Input,
  InputRequiredStar,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Tr,
  useAdminCreatePlanMutation,
  useAdminUpdatePlanMutation,
} from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, useForm } from "utils";
import { CommissionOn, MembershipRecurring } from "@features/API";

const commissionTypes: {
  id: string;
  name: string;
}[] = [
  {
    id: "1",
    name: "Sale",
  },
  {
    id: "3",
    name: "revenue",
  },
  {
    id: "2",
    name: "External Click",
  },
];

const commissions: {
  usage: number;
  value: number;
}[] = [
  {
    usage: 50000,
    value: 15,
  },
  {
    usage: 100000,
    value: 10,
  },
  {
    usage: 150000,
    value: 5,
  },
];

const EditSubscriptionPlan = () => {
  const { t } = useTranslation();
  const { getParam } = useRouting();
  const id = getParam("id");
  const isNew = id === "new";

  const { form: updateForm, inputProps: changeUpdatePlan } = useForm<
    Parameters<typeof useAdminUpdatePlanMutation>[0]
  >({ id }, { id });
  const { form: createForm, inputProps: changeCreatePlan } = useForm<
    Parameters<typeof useAdminCreatePlanMutation>[0]
  >({
    includings: [],
    name: "",
    recurring: MembershipRecurring.Week,
    sortOrder: 1,
    turnover_rules: [],
  });

  const { mutate: updatePlan } = useAdminUpdatePlanMutation(updateForm);
  const { mutate: createPlan } = useAdminCreatePlanMutation(createForm);

  const handleChange = isNew ? changeCreatePlan : changeUpdatePlan;

  return (
    <section>
      <div className="w-full gpa-2 flex justify-end py-4">
        <Button className="w-8 h-8" center>
          <SaveIcon className="text-white fill-white" />
        </Button>
        <Button className="w-8 h-8" colorScheme="white" center>
          <ArrowRoundBack />
        </Button>
      </div>
      <div className="border border-gray-300">
        <div className="flex border-b border-gray-300 items-center gap-2 p-4">
          <EditIcon />
          <p>
            {isNew ? t("Add") : t("Edit")} {t("Subscription Plan")}
          </p>
        </div>
        <div className="p-4">
          <Table
            className="w-full"
            TdProps={{
              className:
                "even:w-3/4 odd:flex odd:items-center odd:w-1/4 odd:whitespace-nowrap",
            }}
          >
            <TBody>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Subscription Plan Name")}</p>
                </Td>
                <Td>
                  <Input {...handleChange("name")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p className="text-2xl text-gray-400">{t("Trial")}</p>
                </Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Trial Price")}</p>
                </Td>
                <Td>
                  <Input type="number" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Trial Duration")}</p>
                </Td>
                <Td>
                  <HStack>
                    <Input type="number" />
                    <Select>
                      <SelectOption value={"day"}>{t("Day")}</SelectOption>
                      <SelectOption value={"week"}>{t("Week")}</SelectOption>
                      <SelectOption value={"month"}>{t("Month")}</SelectOption>
                      <SelectOption value={"year"}>{t("Year")}</SelectOption>
                    </Select>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Trial Cycle")}</p>
                </Td>
                <Td>
                  <HStack>
                    <Input type="number" />
                    <Select>
                      <SelectOption value={"day"}>{t("Day")}</SelectOption>
                      <SelectOption value={"week"}>{t("Week")}</SelectOption>
                      <SelectOption value={"month"}>{t("Month")}</SelectOption>
                      <SelectOption value={"year"}>{t("Year")}</SelectOption>
                    </Select>
                  </HStack>
                </Td>
              </Tr>

              <Tr>
                <Td>
                  <p>{t("Trial Status")}</p>
                </Td>
                <Td>
                  <Select>
                    <SelectOption value={true}>{t("Enabled")}</SelectOption>
                    <SelectOption value={false}>{t("Disabled")}</SelectOption>
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p className="w-full border-b-gray-300 text-2xl text-gray-400">
                    {t("Subscription")}
                  </p>
                </Td>
                <Td>
                  <p className="text-2xl"></p>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Price")}</p>
                </Td>
                <Td>
                  <Input type="number" />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Duration")}</p>
                </Td>
                <Td>
                  <HStack>
                    <Input type="number" />
                    <Select>
                      <SelectOption value={"day"}>{t("Day")}</SelectOption>
                      <SelectOption value={"week"}>{t("Week")}</SelectOption>
                      <SelectOption value={"month"}>{t("Month")}</SelectOption>
                      <SelectOption value={"year"}>{t("Year")}</SelectOption>
                    </Select>
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Cycle")}</p>
                </Td>
                <Td>
                  <HStack>
                    <Input type="number" />
                    <Select>
                      <SelectOption value={1}>{t("Day")}</SelectOption>
                      <SelectOption value={7}>{t("Week")}</SelectOption>
                      <SelectOption value={30}>{t("Month")}</SelectOption>
                      <SelectOption value={365}>{t("Year")}</SelectOption>
                    </Select>
                  </HStack>
                </Td>
              </Tr>

              <Tr>
                <Td>
                  <p>{t("Commission on")} </p>
                </Td>
                <Td>
                  <Select>
                    {mapArray(commissionTypes, ({ id, name }) => (
                      <SelectOption value={id}>{name}</SelectOption>
                    ))}
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Commission Type")} </p>
                </Td>
                <Td>
                  <Select>
                    <SelectOption value={"percent"}>
                      {t("Percent")}
                    </SelectOption>
                    <SelectOption value={"cash"}>{t("Cash")}</SelectOption>
                  </Select>
                </Td>
              </Tr>

              <Tr>
                <Td>
                  <p>{t("Commission")} </p>
                </Td>
                <Td>
                  <div className="grid grid-cols-2 gap-2">
                    {mapArray(commissions, ({ usage, value }, i) => (
                      <React.Fragment key={i}>
                        <HStack>
                          <p>{t("Usage")}</p>
                          <Input value={usage} />
                        </HStack>
                        <HStack>
                          <p className="whitespace-nowrap">{t("Cut Value")}</p>
                          <Input value={value} />
                        </HStack>
                      </React.Fragment>
                    ))}
                    <div className="col-span-2">
                      <AddBadgeButton onClick={() => {}}>
                        {t("Add")}
                      </AddBadgeButton>
                    </div>
                  </div>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Status")}</p>
                </Td>
                <Td>
                  <Select>
                    <SelectOption value={true}>{t("Enabled")}</SelectOption>
                    <SelectOption value={false}>{t("Disabled")}</SelectOption>
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Sort Order")}</p>
                </Td>
                <Td>
                  <Input type="number" />
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default EditSubscriptionPlan;
