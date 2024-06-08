import { getBookedSerivceConfirmationDataFetcher } from "api";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { dehydrate, hydrate, QueryClient } from "react-query";
import { ServerSideQueryClientProps, Service } from "types";
import {
  Container,
  ContactUsView,
  getBookedServiceConfirmationQueryKey,
} from "ui";
import { BookConfirmationView } from "../components/BookConfirmation/BookConfirmationView";
import MasterLayout from "../components/MasterLayout";

export interface BookConfirmationPageProps {}

export const getServerSideProps: GetServerSideProps<
  ServerSideQueryClientProps<BookConfirmationPageProps>
> = async ({ query }) => {
  const queryClient = new QueryClient();
  const id = query["id"] as string;

  queryClient.prefetchQuery(
    getBookedServiceConfirmationQueryKey(id || "123"),
    () => getBookedSerivceConfirmationDataFetcher(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const BookConfirmation: NextPage<BookConfirmationPageProps> = () => {
  return (
    <>
      <Head>
        <title>Book confirmation</title>
      </Head>
      <MasterLayout>
        <Container>
          <BookConfirmationView id="123" />
        </Container>
      </MasterLayout>
    </>
  );
};

export default BookConfirmation;
