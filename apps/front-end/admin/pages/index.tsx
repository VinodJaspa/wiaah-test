import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard", // Corrected the string into an object
      permanent: false, // Set to false for a temporary redirect
    },
  };
};

const Index: NextPage = () => {
  return <div></div>;
};

export default Index;
