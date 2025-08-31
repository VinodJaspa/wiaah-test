import { ArrowUp } from "lucide-react";
import Head from "next/head";
import { ProductsWithProfile } from "placeholder";
import React, { useEffect, useState } from "react";
import { getMockProductData, InfiniteScrollWrapper, ProductSearchCard, ProductSearchCardProps, SellerLayout } from "ui";

interface SellerShopProps { }

const SellerShop: React.FC<SellerShopProps> = () => {
  const [items, setItems] = useState<ProductSearchCardProps[]>(getMockProductData(1, 6));
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchMore = () => {
    if (items.length >= 2000) {
      setHasMore(false);
      return;
    }

    // simulate API delay
    setTimeout(() => {
      const newItems = getMockProductData(items.length + 1, 6);
      setItems((prev) => [...prev, ...newItems]);
    }, 1200);
  };

  // handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // show button after 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <SellerLayout>
        <div className="grid gap-12 grid-cols-3 mt-10">
          {/* Infinite Scroll Grid */}
          <InfiniteScrollWrapper
            dataLength={items.length}
            hasMore={hasMore}
            next={fetchMore}
          >
            {items
              .map((prod, i) => (
                <ProductSearchCard key={i} {...prod} />
              ))}
          </InfiniteScrollWrapper>
          {/* Scroll To Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black text-white shadow-lg hover:bg-primary/90 transition"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </div>
      </SellerLayout>
    </>
  );
};

export default SellerShop;
