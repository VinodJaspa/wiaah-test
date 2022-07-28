import React from "react";
import {
  Container,
  Padding,
  ShopFilter,
  Spacer,
  SpinnerFallback,
  useGetProductsQuery,
  useScreenWidth,
  useSearchFilters,
} from "ui";
import { GridContainerPager } from "ui";
import { Reviews } from "ui";
import { ShopProductFilter } from "ui";
import { ProductCard } from "ui";
import { ProductDetails } from "types";
import { categories } from "placeholder";
import { ShopProfile } from "./ShopProfile";
import { BuyerCommentProps } from "ui";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { usePagination } from "hooks";

interface ShopViewProps {
  products: ProductDetails[];
  reviews: BuyerCommentProps[];
}

export const ShopView: React.FC<ShopViewProps> = ({ products, reviews }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { min } = useScreenWidth({ minWidth: 640 });
  const { filters } = useSearchFilters();
  const { page, take } = usePagination();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetProductsQuery({ page, take }, filters);

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
                categories={categories}
                priceRange={{ max: 1000, min: 10 }}
              />
            </div>
            <div className="flex w-full flex-col items-center px-8">
              <GridContainerPager componentsLimit={20}>
                {/* shop items */}
                {res
                  ? res.data.map((product, i) => (
                      <SpinnerFallback isLoading={isLoading} isError={isError}>
                        {res ? (
                          <ProductCard
                            buttonText="Add to Cart"
                            {...product}
                            key={i}
                            full={min}
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
