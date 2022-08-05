import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Service } from "types";
import { Container, ContactUsView } from "ui";
import { BookConfirmationView } from "../components/BookConfirmation/BookConfirmationView";
import MasterLayout from "../components/MasterLayout";

export interface BookConfirmationPageProps {
  service: Service;
}

export const getServerSideProps: GetServerSideProps<
  BookConfirmationPageProps
> = async () => {
  const service: Service = {
    serviceName: "test service name",
    serviceOwner: "Wiaah",
    serviceThumbnail:
      "https://cdn.dayrooms.com/image_cache/A1000/1783/King-d16ae5df94d1ffadec0a2eb6ffa86c97-hotel-homepage.jpg",
    contacts: {
      phone: "123456789",
      email: "testemail@email.com",
    },
    rooms: [
      {
        type: "one",
        nightPrice: 1250,
        nights: 2,
      },
      {
        type: "two",
        nightPrice: 1550,
        nights: 2,
      },
      {
        type: "three",
        nightPrice: 950,
        nights: 1,
      },
    ],
    location: {
      streetName: "Shri New Homestay, Coorg, Madikeri Road",
      streetNumber: 571201,
      city: "Karnataka",
      country: "",
    },
  };

  return {
    props: {
      service,
    },
  };
};

const BookConfirmation: NextPage<BookConfirmationPageProps> = ({ service }) => {
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
