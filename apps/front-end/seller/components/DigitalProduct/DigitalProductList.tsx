// components/DigitalProductList.tsx
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import ProductDetail from "./ViewProductDetails";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";


const mockProducts = Array(10).fill(null).map((_, i) => ({
    id: i,
    title: i < 3 ? "Product A" : "Product B",
    orderId: "1234567890",
    imageSrc: `https://picsum.photos/seed/product${i}/200/200`, // random image per product
}));


const DigitalProductList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState(null);
    const handleClick = (productDetails: any) => {
        setProduct(productDetails);

    };
    if (product) {
        return (
            <ProductDetail query={product} emptyProduct={() => setProduct(null)} />
        )
    }
   

    return (
        <div className="max-w-4xl mx-auto px-4">
            <SectionTitle title="My Digital Product" />
          

            <div className="bg-white shadow rounded-lg p-4">
                <SearchBoxInner/>
                {mockProducts.map((product) => (
                    <ProductItem
                        key={product.id}
                        imageSrc={product.imageSrc}
                        title={product.title}
                        orderId={product.orderId}
                        onViewDetails={() => handleClick(product)}
                        onDownload={() => alert("Downloading product")}
                    />
                ))}
            </div>
            <Pagination total={5} current={page} onPageChange={(p) => setPage(p)} />

        </div>
    );
};

export default DigitalProductList;
