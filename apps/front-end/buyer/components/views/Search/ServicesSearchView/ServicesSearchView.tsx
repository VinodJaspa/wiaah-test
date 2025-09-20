import { getMockServices, InfiniteScrollWrapper, SearchServiceCardProps } from "@UI";
// Dynamic import with SSR disabled
const SearchServiceCard = dynamic<SearchServiceCardProps>(
  () =>
    import(
      "@UI/components/features/Search/Services/components/Cards/SearchServiceCard/SearchServiceCard"
    ).then((mod) => mod.SearchServiceCard),
  { ssr: false }
);
import { ServicesSearchBadgeList } from "@UI/components/features/Services/components/DataDisplay/ServicesSearchBadgeList/index";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react"; // icon
import dynamic from "next/dynamic";

export const ServicesSearchView: React.FC = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState<SearchServiceCardProps[]>(getMockServices(1, 6));
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchMore = () => {
    if (items.length >= 2000) {
      setHasMore(false);
      return;
    }

    // simulate API delay
    setTimeout(() => {
      const newItems = getMockServices(items.length + 1, 6);
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
    <div className="flex flex-col gap-10 px-4 md:px-8 lg:px-12">
      <Formik initialValues={{ serviceType: "hotel" } as any} onSubmit={() => { }}>
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-7">
            {/* Service Type Tabs */}
            <ServicesSearchBadgeList
              activeKey={values["serviceType"]}
              onClick={(serviceType) => setFieldValue("serviceType", serviceType)}
            />

            {/* Infinite Scroll Grid */}
            <InfiniteScrollWrapper
              dataLength={items.length}
              hasMore={hasMore}
              next={fetchMore}
            >
              {items
                .filter((v) => v.serviceType === values["serviceType"])
                .map((service, i) => (
                  <SearchServiceCard key={i} {...service} />
                ))}
            </InfiniteScrollWrapper>
          </Form>
        )}
      </Formik>

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
  );
};
