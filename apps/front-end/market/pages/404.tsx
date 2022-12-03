import { NextPage } from "next";
import { NotFound } from "ui";
import MasterLayout from "../components/MasterLayout";

export const Custom404: NextPage = () => {
  return (
    <MasterLayout>
      <NotFound />
    </MasterLayout>
  );
};

export default Custom404;
