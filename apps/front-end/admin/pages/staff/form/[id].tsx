import {
  AspectRatioImage,
  Button,
  EditIcon,
  getRandomImage,
  Input,
  InputRequiredStar,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TBody,
  Td,
  Tr,
  useAdminCreateStaffAccountMutation,
  useAdminUpdateStaffAccountMutation,
  useAdminGetAccount,
} from "ui";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useForm } from "utils";
import {
  AccountGenderEnum,
  AccountType,
  StaffAccountType,
} from "@features/API";

const manageStaff: NextPage = () => {
  const { t } = useTranslation();

  const { getParam } = useRouting();

  const id = getParam("id");

  const isNew = id === "new";

  const { data } = useAdminGetAccount(id);
  const {
    form: updateForm,
    inputProps: updateInputProps,
    selectProps: updateSelectProps,
  } = useForm<Parameters<typeof update>[0]>(
    { id, ...data, type: data?.accountType as unknown as StaffAccountType },
    { id }
  );
  const {
    form: createForm,
    inputProps: createInputProps,
    selectProps: createSelectProps,
  } = useForm<Parameters<typeof create>[0]>({
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    photo: "",
    birthDate: "",
    gender: AccountGenderEnum.Male,
    type: StaffAccountType.Moderator,
  });
  const { mutate: update } = useAdminUpdateStaffAccountMutation();
  const { mutate: create } = useAdminCreateStaffAccountMutation();

  const inputProps = isNew ? createInputProps : updateInputProps;
  const selectProps = isNew ? createSelectProps : updateSelectProps;

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            isNew ? create(createForm) : update(updateForm);
          }}
          className="fill-white text-white"
        >
          <SaveIcon />
        </Button>
      </div>
      <div className="border border-gray-300 p-4">
        <div className="flex items-center gap-2 p-4">
          <EditIcon />
          {id ? <p>{t("Add Staff")}</p> : <p>{t("Edit Staff")}</p>}
        </div>
        <div className="p-4">
          <Table
            className="w-full"
            TdProps={{
              className:
                "odd:flex odd:items-center odd:w-1/4 odd:whitespace-nowrap",
            }}
          >
            <TBody>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Username")}</p>
                </Td>
                <Td>
                  <Input />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("First Name")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("firstName")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Last Name")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("lastName")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("E-Mail")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("email")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Staff Role")}</p>
                </Td>
                <Td>
                  <Select {...selectProps("type")}>
                    <SelectOption value={"admin"}>{t("Admin")}</SelectOption>
                    <SelectOption value={"mod"}>{t("Moderator")}</SelectOption>
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <p>{t("Image")}</p>
                </Td>
                <Td>
                  <div className="w-48 rounded-xl overflow-hidden">
                    <AspectRatioImage
                      className="group"
                      alt=""
                      ratio={3 / 4}
                      src={getRandomImage()}
                    >
                      <div className="absolute transition-opacity top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto flex justify-center items-center">
                        <EditIcon className="text-4xl cursor-pointer text-white" />
                      </div>
                    </AspectRatioImage>
                  </div>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Password")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("password")} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Confirm")}</p>
                </Td>
                <Td>
                  <Input {...inputProps("confirmPassword")} />
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default manageStaff;
