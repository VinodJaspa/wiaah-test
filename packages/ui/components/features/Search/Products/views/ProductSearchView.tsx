import { mapArray, useForm } from "@UI/../utils/src";
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
  FilterSelectInputProps,
  StatusSelectInputProps,
  BrandSelectInputProps,
  ProductSearchCard,
  useResponsive,
  InputGroup,
  InputLeftElement,
  Input,
  SectionHeader,
  HStack,
  BoxIcon,
  FourBoxesIcon,
  Accordion,
  AccordionButton,
  AccordionPanel,
  randomNum,
  getRandomImage,
  AspectRatioImage,
  StarIcon,
  PriceDisplay,
  ShoppingCartIcon,
} from "ui";

export const ProductSearchView: React.FC<{ searchSlug: string }> = ({
  searchSlug,
}) => {
  const { isMobile } = useResponsive();
  const [isGrid, setIsGrid] = React.useState<boolean>(false);

  const { inputProps, form } = useForm<{
    q: string;
  }>({ q: "" });

const { t } = useTranslation();

  const products: {
    name: string;
    rate: number;
    reviews: number;
    price: number;
    discount: number;
    id: string;
    thumbnail: string;
  }[] = [...Array(50)].map((_, i) => ({
    id: i.toString(),
    discount: randomNum(150),
    name: "hotel",
    price: randomNum(300),
    rate: randomNum(5),
    reviews: randomNum(150),
    thumbnail: getRandomImage(),
  }));

  return isMobile ? (
    <div className="flex flex-col gap-4 p-4">
      {typeof searchSlug === "string" ? (
        <>
          <SectionHeader sectionTitle={searchSlug} />

          <Accordion>
            <HStack className="justify-between">
              <AccordionButton>
                <HStack>
                  <p className="text-sm">{t("Filter & Sort")}</p>
                  <></>
                </HStack>
              </AccordionButton>
              <HStack className="gap-4">
                <button
                  className={`${isGrid ? "text-black" : "bg-primary text-white"
                    } h-6 w-6 flex justify-center items-center`}
                  onClick={() => setIsGrid(false)}
                >
                  <BoxIcon />
                </button>
                <button
                  className={`${isGrid ? "bg-primary text-white" : "text-black"
                    } h-6 w-6 flex justify-center items-center`}
                  onClick={() => setIsGrid(true)}
                >
                  <FourBoxesIcon />
                </button>
              </HStack>
            </HStack>
            <AccordionPanel></AccordionPanel>
          </Accordion>

          <div
            className={`${isGrid ? "grid-cols-2" : "grid-cols-1"} gap-2 grid`}
          >
            {mapArray(products, (prod, i) => (
              <div className="flex flex-col shadow bg-white rounded-lg gap-2 p-2">
                <AspectRatioImage
                  className="rounded-lg overflow-hidden"
                  key={prod.id}
                  ratio={0.9411764705882353}
                  alt={prod.name}
                  src={prod.thumbnail}
                />

                <p className="font-medium">{prod.name}</p>
                <HStack>
                  <StarIcon className="text-sm fill-yellow-300" />
                  <p className="text-grayText text-xs">
                    {prod.rate}/5 {`(${prod.reviews})`}
                  </p>
                </HStack>
                <HStack className="mt-2 justify-between">
                  <PriceDisplay
                    className="text-2xl font-semibold"
                    price={prod.price}
                    symbolProps={{ className: "text-primary" }}
                  />

                  <Button colorScheme="darkbrown" onClick={() => { }}>
                    <ShoppingCartIcon className="text-white text-xl" />
                  </Button>
                </HStack>
              </div>
            ))}
          </div>
        </>
      ) : (
        <InputGroup className="rounded-xl bg-lightGray">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input {...inputProps("q")} className="bg-transparent" />
        </InputGroup>
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-14 w-full">
      <Formik initialValues={{}} onSubmit={() => { }}>
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
                onChange={() => { }}
                value={""}
                label={t("Status")}
                options={[t("Available")]}
                as={StatusSelectInput}
              />
              <FormikInput<BrandSelectInputProps>
                name="brand"
                onChange={() => { }}
                value={""}
                label={t("Brand")}
                options={[t("Nike")]}
                as={BrandSelectInput}
              />
              <FormikInput<FilterSelectInputProps>
                name="shipping"
                onChange={() => { }}
                value={""}
                label={t("Shipping")}
                options={[t("Click & Collect")]}
                as={FilterSelectInput}
              />
              <FormikInput<FilterSelectInputProps>
                name="size"
                onChange={() => { }}
                value={""}
                label={t("Size")}
                options={[t("Extra Large")]}
                as={FilterSelectInput}
              />
              <FormikInput<FilterSelectInputProps>
                name="rating"
                onChange={() => { }}
                value={""}
                label={t("Rating")}
                options={[...Array(5)].map(
                  (_, i) => `${Math.abs(i - 5)} ${t("Stars")}`
                )}
                as={FilterSelectInput}
              />
              <FormikInput
                name="price"
                onChange={() => { }}
                value={""}
                label={t("Price")}
                as={() => (
                  <div className="flex gap-1">
                    <NumberInput
                      onChange={() => { }}
                      value={0}
                      placeholder="Min"
                    />
                    <NumberInput
                      onChange={() => { }}
                      value={0}
                      placeholder="Max"
                    />
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
