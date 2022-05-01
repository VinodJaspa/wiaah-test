import React from "react";
import { Container, Padding, ShopFilter, Spacer, useScreenWidth } from "ui";
import { GridContainerPager } from "ui/components/blocks/GridContainerPager";
import { Reviews } from "ui/components/blocks/Reviews";
import { ShopProductFilter } from "ui/components/blocks/products/ShopProductFilter";
import { ProductCard } from "ui/components/blocks/ProductCard";
import { ProductDetails } from "ui/types/products/ProductDetail.interface";
import { categories } from "ui/placeholder/categories";
import { Shop, ShopProfile } from "./ShopProfile";
import { BuyerCommentProps } from "ui/components/blocks/BuyerComment";
import { useRouter } from "next/router";
import { ProductTypes } from "types/market/Product";
import { shopRouting } from "uris";
import { useTranslation } from "react-i18next";

interface ShopViewProps {
  shop: Shop;
  products: ProductDetails[];
  reviews: BuyerCommentProps[];
}

export const ShopView: React.FC<ShopViewProps> = ({
  shop,
  products,
  reviews,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { min } = useScreenWidth({ minWidth: 640 });

  function handleNavToProduct(id: string, type: ProductTypes) {
    switch (type) {
      case "product":
        router.push(`${shopRouting.productPage}/${id}`);
        break;
      case "service":
        router.push(`${shopRouting.servicePage}/${id}`);
        break;
    }
  }

  return (
    <section className="flex flex-col items-center justify-center">
      {/* shop info */}
      <ShopProfile shop={shop} fullWidth={min} />
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
                {products.map((product, i) => (
                  <ProductCard
                    onButtonClick={() =>
                      handleNavToProduct(product.id, product.type)
                    }
                    buttonText="Add to Cart"
                    id={product.id || ""}
                    name={product.name || ""}
                    imageUrl={product.imgUrl || ""}
                    price={product.price}
                    rating={product.rating}
                    variant={product.type}
                    cashback={product.cashBack}
                    discount={product.off}
                    oldPrice={product.oldPrice}
                    key={i}
                    full={min}
                  />
                ))}
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
