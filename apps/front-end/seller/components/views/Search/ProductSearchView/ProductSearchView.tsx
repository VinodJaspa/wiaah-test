import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Divider,
  Stack,
  ProductSearchLocationInput,
  ProductColorSelectInput,
  CategoriesSelectInput,
  SearchIcon,
  FormikInput,
  Button,
  StatusSelectInput,
  BrandSelectInput,
  FilterSelectInput,
  NumberInput,
  ProductSearchLocationInputProps,
  ProductColorSelectInputProps,
  CategoriesSelectInputProps,
  FilterSelectInputProps,
  StatusSelectInputProps,
  BrandSelectInputProps,
  ProductSearchCard,
} from "ui";

export const ProductSearchView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-14 w-full">
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form className="flex flex-col gap-7">
            <div className="flex gap-8">
              <Stack divider={<Divider variant="vert" />}>
                <FormikInput
                  as={ProductSearchLocationInput}
                  name={"ProductSearchLocationInput"}
                />
                <FormikInput
                  as={ProductColorSelectInput}
                  name={"ProductColorSelectInput"}
                />
                <FormikInput
                  as={CategoriesSelectInput}
                  name={"CategoriesSelectInput"}
                />
              </Stack>
              <Button className="flex gap-2 text-white items-center">
                <SearchIcon />
                <p>{t("Submit")}</p>
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-5">
              <FormikInput<StatusSelectInputProps>
                name="status"
                label={t("Status")}
                options={[t("Available")]}
                as={StatusSelectInput}
              />
              <FormikInput<BrandSelectInputProps>
                name="brand"
                label={t("Brand")}
                options={[t("Nike")]}
                as={BrandSelectInput}
              />
              <FormikInput<FilterSelectInputProps>
                name="shipping"
                label={t("Shipping")}
                options={[t("Click & Collect")]}
                as={FilterSelectInput}
              />
              <FormikInput<FilterSelectInputProps>
                name="size"
                label={t("Size")}
                options={[t("Extra Large")]}
                as={FilterSelectInput}
              />
              <FormikInput<FilterSelectInputProps>
                name="rating"
                label={t("Rating")}
                options={[...Array(5)].map(
                  (_, i) => `${Math.abs(i - 5)} ${t("Stars")}`
                )}
                as={FilterSelectInput}
              />
              <FormikInput
                name="price"
                label={t("Price")}
                as={() => (
                  <div className="flex gap-1">
                    <NumberInput placeholder="Min" />
                    <NumberInput placeholder="Max" />
                  </div>
                )}
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="grid gap-12 grid-cols-4">
        {[...Array(12)]
          .map((_, i) => ({
            productInfo: {
              cashback: 5,
              colors: [
                "#4272EE",
                "#3CD399",
                "#F93030",
                "#000000",
                "#FFC700",
                "#fff",
              ],
              price: 50,
              discount: 15,
              rating: 4.8,
              reviewsCount: 150,
              thumbnail:
                "https://nextluxury.com/wp-content/uploads/Scarves-Fashion-Accessories-For-Men.jpg",
              title: "Product title",
            },
            sellerInfo: {
              name: "Seller name",
              profession: "Profession",
              thumbnail: "/profile (1).jfif",
              verified: true,
            },
          }))
          .map((prod, i) => (
            <ProductSearchCard key={i} {...prod} />
          ))}
      </div>
    </div>
  );
};
