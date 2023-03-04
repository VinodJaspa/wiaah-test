import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: "/dashbaord",
    notFound: true,
    props: {},
  };
};

const index: NextPage = () => {
  return null;
};

export default index;
