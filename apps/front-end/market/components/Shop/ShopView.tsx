import React from "react";
import {
  Container,
  Padding,
  Reviews,
  ShopFilter,
  Spacer,
  SpinnerFallback,
  useGetProductsQuery,
  usePaginationControls,
  useScreenWidth,
  useSearchFilters,
} from "ui";
import { GridContainerPager } from "ui";

import { ShopProductFilter } from "ui";
import { ProductCard } from "ui";
import { ProductDetails } from "types";
import { ShopProfile } from "./ShopProfile";
import { BuyerCommentProps } from "ui";
import { usePagination } from "hooks";
import { Category, ProductCategoryStatus } from "@features/API";

const FAKE_CATEGORIES: Category[] = [
  {
    __typename: "Category",
    id: "1",
    name: "Electronics",
    parantId: null,
    sales: 150,
    sortOrder: 1,
    status: ProductCategoryStatus.Active,
  },
  {
    __typename: "Category",
    id: "2",
    name: "Laptops",
    parantId: "1",
    sales: 80,
    sortOrder: 2,
    status: ProductCategoryStatus.Active,
  },
  {
    __typename: "Category",
    id: "3",
    name: "Smartphones",
    parantId: "1",
    sales: 200,
    sortOrder: 3,
    status: ProductCategoryStatus.Active,
  },
  {
    __typename: "Category",
    id: "4",
    name: "Accessories",
    parantId: "1",
    sales: 50,
    sortOrder: 4,
    status: ProductCategoryStatus.Active,
  },
  {
    __typename: "Category",
    id: "5",
    name: "Home Appliances",
    parantId: null,
    sales: 70,
    sortOrder: 5,
    status: ProductCategoryStatus.InActive,
  },
];

interface ShopViewProps {
  products: ProductDetails[];
  reviews: BuyerCommentProps[];
}

export const ShopView: React.FC<ShopViewProps> = ({ products, reviews }) => {
  const { min } = useScreenWidth({ minWidth: 640 });
  const { filters } = useSearchFilters();
  const { page, take } = usePagination();
  const { pagination } = usePaginationControls();
  const { data: res, isLoading, isError } = useGetProductsQuery({ pagination });

  return (
    <section className="flex flex-col items-center justify-center">
      {/* shop info */}
      <ShopProfile shopId={"123"} fullWidth={min} />
      <Spacer />
      <Container>
        <ShopFilter />
        <Spacer />
        <div className="flex items-start justify-center">
          <div className="flex w-full justify-center gap-4">
            <div className="hidden md:block">
              <ShopProductFilter
                open={true}
                shipping={["Click and Collect", "Free", "International"]}
                colors={["#920", "#059", "#229"]}
                size={["S", "M", "L", "XL", "XXL", "XXXL"]}
                stockStatus={true}
                rating={true}
                countryFilter={true}
                cityFilter={true}
                categories={FAKE_CATEGORIES}
                priceRange={{ max: 1000, min: 10 }}
              />
            </div>
            <div className="flex w-full flex-col items-center px-8">
              <GridContainerPager componentsLimit={20}>
                {/* shop items */}
                {res
                  ? res.map((product, i) => (
                    <SpinnerFallback
                      key={i}
                      isLoading={isLoading}
                      isError={isError}
                    >
                      {res ? (
                        <ProductCard
                          cashback={product.cashback.amount}
                          discount={product.discount.amount}
                          id={product.id}
                          price={product.price}
                          thumbnail={product.presentations[0].src}
                          title={product.title[0]}
                          rating={product.rate}
                          buttonText="Add to Cart"
                          key={i}
                        />
                      ) : null}
                    </SpinnerFallback>
                  ))
                  : null}
              </GridContainerPager>

              <Spacer />
              <Spacer />
              <Padding X={{ value: 1 }}>
                <Reviews id="reviews" reviews={reviews} />
              </Padding>
            </div>
          </div>
        </div>
      </Container>
      <Spacer />
    </section>
  );
};
