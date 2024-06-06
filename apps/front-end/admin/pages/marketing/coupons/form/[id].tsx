import React from "react";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  Avatar,
  Button,
  DateFormInput,
  EditIcon,
  FilterSelectInput,
  Input,
  InputRequiredStar,
  Pagination,
  SaveIcon,
  Select,
  SelectOption,
  SimpleTabHead,
  SimpleTabHeadButton,
  SimpleTabItemList,
  SimpleTabs,
  Switch,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import { mapArray, randomNum } from "utils";
import { getRandomImage } from "placeholder";

interface CouponHistory {
  id: string;
  buyer: {
    name: string;
  };
  seller: {
    name: string;
  };
  amount: number;
  code: string;
  category: string;
  productName: string;
  dateAdded: string;
}

const couponHistory: CouponHistory[] = [...Array(5)].map((_, i) => ({
  id: i.toString(),
  amount: randomNum(150),
  buyer: {
    name: "buyer name" + i,
    photo: getRandomImage(),
  },
  seller: {
    name: "seller name" + i,
    photo: getRandomImage(),
  },
  category: "category",
  code: "code-" + i,
  dateAdded: new Date().toString(),
  productName: "product/service name" + i,
}));

const Couponform: NextPage = () => {
  const { t } = useTranslation();
  const { getParam, back } = useRouting();
  const id = getParam("id");

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
          <p>{t("Edit Coupon")}</p>
        </div>
        <div className="p-4">
          <SimpleTabs>
            <div className="flex flex-wrap gap-2">
              <SimpleTabHead>
                <SimpleTabHeadButton>{t("General")}</SimpleTabHeadButton>
                <SimpleTabHeadButton>{t("History")}</SimpleTabHeadButton>
              </SimpleTabHead>
            </div>
            <SimpleTabItemList>
              <div>
                <Table className="w-full">
                  <TBody>
                    <Tr>
                      <Td>
                        <InputRequiredStar />
                        {t("Coupon Name")}
                      </Td>
                      <Td>
                        <Input />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <InputRequiredStar />
                        {t("Code")}
                      </Td>
                      <Td>
                        <Input />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Type")}</Td>
                      <Td>
                        <Select>
                          <SelectOption value={"percent"}>
                            {t("Percentage")}
                          </SelectOption>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Discount")}</Td>
                      <Td>
                        <Input type="number" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Total Amount")}</Td>
                      <Td>
                        <Input
                          description={t(
                            "The total amount that must be reached before coupon is valid"
                          )}
                          type="type"
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Customer Login")}</Td>
                      <Td>
                        <Switch />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Free Shipping")}</Td>
                      <Td>
                        <Switch />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Products")}</Td>
                      <Td>
                        <FilterSelectInput
                          onChange={() => {}}
                          options={[]}
                          value={""}
                        />
                        <p className="text-xs text-gray">
                          {t(
                            "Choose specific products the coupon will apply to. Select no products to apply coupon to entire cart."
                          )}
                        </p>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Category")}</Td>
                      <Td>
                        <FilterSelectInput
                          onChange={() => {}}
                          options={[]}
                          value={""}
                        />
                        <p className="text-xs text-gray">
                          {t("Choose all products under selected category.")}
                        </p>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Date Start")}</Td>
                      <Td>
                        <DateFormInput />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Date End")}</Td>
                      <Td>
                        <DateFormInput />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Ueses Per Coupon")}</Td>
                      <Td>
                        <Input type="number" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Uses Per Customer")}</Td>
                      <Td>
                        <Input type="number" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>{t("Status")}</Td>
                      <Td>
                        <Select>
                          <SelectOption value={"disabled"}>
                            {t("Disabled")}
                          </SelectOption>
                          <SelectOption value={"enabled"}>
                            {t("Enabled")}
                          </SelectOption>
                        </Select>
                      </Td>
                    </Tr>
                  </TBody>
                </Table>
              </div>
              <div>
                <TableContainer>
                  <Table TdProps={{ className: "border" }} className="w-full">
                    <THead>
                      <Tr>
                        <Th>{t("Seller")}</Th>
                        <Th>{t("Buyer")}</Th>
                        <Th>{t("Order ID")}</Th>
                        <Th>{t("Code")}</Th>
                        <Th>{t("Amount")}</Th>
                        <Th>{t("Product")}</Th>
                        <Th>{t("Category")}</Th>
                        <Th>{t("Date Added")}</Th>
                      </Tr>
                    </THead>
                    <TBody>
                      {mapArray(
                        couponHistory,
                        ({
                          amount,
                          buyer,
                          category,
                          code,
                          dateAdded,
                          id,
                          productName,
                          seller,
                        }) => (
                          <Tr key={id}>
                            <Td>{seller.name}</Td>
                            <Td>{buyer.name}</Td>
                            <Td>{id}</Td>
                            <Td>{code}</Td>
                            <Td>{amount}</Td>
                            <Td>{productName}</Td>
                            <Td>{category}</Td>
                            <Td>{new Date(dateAdded).toDateString()}</Td>
                          </Tr>
                        )
                      )}
                    </TBody>
                  </Table>
                </TableContainer>
                <Pagination />
              </div>
            </SimpleTabItemList>
          </SimpleTabs>
        </div>
      </div>
    </section>
  );
};

export default Couponform;
