import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Product } from "ui/components/blocks/products/product";
import { ProductFilter } from "ui/components/blocks/products/productFilter";
import { BreadCrumb } from "ui/components/blocks/BreadCrumb";
import { Divider } from "ui/components";
import {FaChevronDown} from "react-icons/fa";
import {
  Root,
  Header,
  Footer,
  AuthFooter,
  ImageSlider,
  ImageCard,
} from "ui/components";
import {SearchView} from "ui/views";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { BiListUl, BiGridAlt } from "react-icons/bi";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi"



const Search: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Wiaah | Search results</title>
      </Head>
      <main className="block w-full grow">
        <SearchView></SearchView>
      </main>
    </>
  );
};

export default Search;
