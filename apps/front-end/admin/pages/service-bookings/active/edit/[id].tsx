import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiTruck } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { useRouting } from "routing";
import {
  ArrowRoundBack,
  ExclamationCircleIcon,
  Input,
  MinusIcon,
  PlusIcon,
  PriceDisplay,
  RefreshIcon,
  SaveIcon,
  Select,
  SelectOption,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  BookDetailsSection,
} from "ui";
import { mapArray, randomNum } from "utils";

const ServiceBook = () => {
  const { getParam, back } = useRouting();
  const orderId = getParam("id");
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Edit Active Service Bookings </title>
      </Head>
      <section className="flex flex-col gap-4 w-full">
        <BookDetailsSection onGoBack={() => back()} bookId="13545" />
      </section>
    </React.Fragment>
  );
};

export default ServiceBook;
