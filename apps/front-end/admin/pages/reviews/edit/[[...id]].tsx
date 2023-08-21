import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  EditIcon,
  InputRequiredStar,
  Radio,
  SaveIcon,
  Table,
  TBody,
  Td,
  Textarea,
  Tr,
  useAdminUpdateProductReviewMutation,
  useGetReviewQuery,
} from "ui";
import { useForm } from "utils";
import * as yup from "yup";

const EditReview = () => {
  const { t } = useTranslation();
  const { getParam, back } = useRouting();
  const id = getParam("id");

  const isNew = typeof id !== "string";

  const { form, inputProps, setInitialData, handleChange } = useForm<
    Parameters<typeof mutate>[0]
  >(
    {
      id,
    },
    {},
    {
      yupSchema: yup.object({
        message: yup.string().min(3).required(),
      }),
    }
  );

  useGetReviewQuery(id, {
    onSuccess(data) {
      setInitialData({
        id,
        message: data.message,
        productId: data.productId,
        rate: data.rate,
      });
    },
    enabled: !isNew,
  });

  const { mutate } = useAdminUpdateProductReviewMutation();

  return (
    <section>
      <div className="flex text-white fill-white justify-end py-4 text-xl gap-2">
        <button onClick={() => mutate(form)}>
          <SaveIcon className="w-8 h-8 p-2 bg-cyan-600 border border-blue-800" />
        </button>
        <button onClick={() => back()}>
          <ArrowRoundBack className="text-black fill-black w-8 h-8 p-2 border border-gray-300" />
        </button>
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
              <Td valign="top">
                <div className="flex w-fit h-full items-start">
                  <InputRequiredStar />
                  {t("Text")}
                </div>
              </Td>
              <Td>
                <Textarea {...inputProps("message")} />
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
                    <Radio
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleChange("rate", i + 1);
                        }
                      }}
                      checked={form.rate === i + 1}
                      name={"rating"}
                      value={i + 1}
                    >
                      {i + 1}
                    </Radio>
                  ))}
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
