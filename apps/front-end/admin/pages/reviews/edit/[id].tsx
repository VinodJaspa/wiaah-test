import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  DateFormInput,
  EditIcon,
  Input,
  InputRequiredStar,
  InputSearch,
  Radio,
  SaveIcon,
  Table,
  TBody,
  Td,
  Textarea,
  Tr,
} from "ui";

const EditReview = () => {
  const { t } = useTranslation();
  const { getParam, back } = useRouting();
  const id = getParam("id");

  return (
    <section>
      <div className="flex text-white fill-white justify-end py-4 text-xl gap-2">
        <SaveIcon className="w-8 h-8 p-2 bg-cyan-600 border border-blue-800" />
        <ArrowRoundBack
          onClick={() => back()}
          className="text-black fill-black w-8 h-8 p-2 border border-gray-300"
        />
      </div>
      <div className="flex flex-col border border-gray-300">
        <div className="flex items-center gap-2 p-2 bg-gray-100 border-b border-b-gray-300">
          <EditIcon />
          <p>{t("Edit Review")}</p>
        </div>
        <Table
          TdProps={{ align: "right" }}
          TrProps={{ className: "border-b border-b-gray-200" }}
        >
          <TBody>
            <Tr>
              <Td>
                <div className="flex w-fit items-start">
                  <InputRequiredStar />
                  {t("Buyer")}
                </div>
              </Td>
              <Td align="left">
                <InputSearch onOptionSelect={() => {}} options={[]} />
                <p>
                  {"("}
                  {t("Autocomplete")}
                  {")"}
                </p>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <div className="flex w-fit">
                  <InputRequiredStar />
                  {t("Product")}
                </div>
              </Td>
              <Td align="left">
                <InputSearch onOptionSelect={() => {}} options={[]} />
                <p>
                  {"("}
                  {t("Autocomplete")}
                  {")"}
                </p>
              </Td>
            </Tr>
            <Tr>
              <Td valign="top">
                <div className="flex w-fit h-full items-start">
                  <InputRequiredStar />
                  {t("Text")}
                </div>
              </Td>
              <Td>
                <Textarea />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <div className="flex w-fit items-start">
                  <InputRequiredStar />
                  {t("Rating")}
                </div>
              </Td>
              <Td>
                <div className="flex gap-4">
                  {[...Array(5)].map((v, i) => (
                    <Radio name={"rating"} value={i + 1}>
                      {i + 1}
                    </Radio>
                  ))}
                </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <div className="flex w-fit items-start">
                  <InputRequiredStar />
                  {t("Date Added")}
                </div>
              </Td>
              <Td align="left">
                <div className="w-fit">
                  <DateFormInput />
                </div>
              </Td>
            </Tr>
            <Tr></Tr>
          </TBody>
        </Table>
      </div>
    </section>
  );
};

export default EditReview;
