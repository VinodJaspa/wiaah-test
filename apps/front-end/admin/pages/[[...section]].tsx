import { AdminLayout } from "@components";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: "/dashbaord",
    notFound: true,
    props: {},
  };
};

const index: NextPage = () => {
  return <div>test</div>;
};

export default index;
