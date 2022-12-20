import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  DateFormInput,
  EditIcon,
  Input,
  InputRequiredStar,
  SaveIcon,
  Select,
  SelectOption,
  Textarea,
} from "ui";

const ProductReturnsEdit: NextPage = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();
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
          <p>{t("Edit Prduct Return")}</p>
        </div>
        <div className="flex flex-col gap-4 p-4 w-full">
          <div className="border-b border-b-gray-300">
            <p className="text-2xl">{t("Order Information")}</p>
          </div>
          <div className="grid gap-4 grid-cols-4">
            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Order ID")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Order Date")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-start">
              <DateFormInput />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Buyer")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input className="w-full" value="" />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("First Name")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Last Name")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("E-Mail")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Telephone")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input />
            </div>
          </div>

          <div className="border-b border-b-gray-300">
            <p className="text-2xl">
              {t("Product Information & Reason for Return")}
            </p>
          </div>
          <div className="grid gap-4 grid-cols-4">
            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Product")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Model")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-start">
              <Input />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Quantity")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input type="number" />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Opened")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Select className="w-full">
                <SelectOption value={"opened"}>{t("Opened")}</SelectOption>
                <SelectOption value={"unOpened"}>{t("UnOpened")}</SelectOption>
              </Select>
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Comment")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Textarea />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Return Action")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Select className="w-full">
                <SelectOption value={"refused"}>{t("Refused")}</SelectOption>
                <SelectOption value={"refunded"}>{t("Refunded")}</SelectOption>
                <SelectOption value={"replacement"}>
                  {t("Recplacement sent")}
                </SelectOption>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReturnsEdit;
