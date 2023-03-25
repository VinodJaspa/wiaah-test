import { RefundStatusType } from "@features/API";
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
  useGetAdminReturnedOrder,
} from "ui";
import { useForm } from "utils";

const ProductReturnsEdit: NextPage = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();
  const id = getParam("id");

  const { data } = useGetAdminReturnedOrder(id);

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
              <Input value={data?.orderItem?.order?.id} />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Order Date")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-start">
              <DateFormInput
                dateValue={new Date(
                  data?.orderItem?.order?.createdAt || new Date()
                ).toString()}
              />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Buyer")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input
                className="w-full"
                value={data?.orderItem?.buyer?.profile?.username}
              />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("First Name")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input
                value={data?.orderItem?.order?.shippingAddress?.firstname}
              />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Last Name")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input
                value={data?.orderItem?.order?.shippingAddress?.lastname}
              />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("E-Mail")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input value={data?.orderItem?.buyer?.email} />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Telephone")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input value={data?.orderItem?.order?.shippingAddress?.phone} />
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
              <p>{t("Seller")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input value={data?.orderItem?.seller?.profile?.username} />
            </div>
            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Product")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input value={data?.orderItem?.product?.title} />
            </div>

            <div className="flex w-full justify-end">
              <InputRequiredStar />
              <p>{t("Model")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-start">
              <Input value={data?.orderItem?.product?.brand} />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Quantity")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Input type="number" value={data?.orderItem?.qty} />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Opened")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Select value={data?.opened || false} className="w-full">
                <SelectOption value={true}>{t("Opened")}</SelectOption>
                <SelectOption value={false}>{t("UnOpened")}</SelectOption>
              </Select>
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Comment")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Textarea value={data?.reason} />
            </div>

            <div className="flex w-full justify-end">
              <p>{t("Return Action")}</p>
            </div>
            <div className="flex col-span-3 w-full justify-end">
              <Select value={data?.status} className="w-full">
                <SelectOption value={RefundStatusType.Reject}>
                  {t("Refused")}
                </SelectOption>
                <SelectOption value={RefundStatusType.Accept}>
                  {t("Refunded")}
                </SelectOption>
                <SelectOption value={RefundStatusType.Pending}>
                  {t("Pending")}
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
