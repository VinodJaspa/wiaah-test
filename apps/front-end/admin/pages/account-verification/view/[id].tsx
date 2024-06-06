import {
  useAdminGetAccountVerifficationRequest,
  useAdminGetProfileVerificationQuery,
} from "@UI";
import { AdminListTable } from "@components";
import { Avatar, Image, Table, Td, Tr } from "@partials";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

const View: NextPage = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();

  const id = getParam("id");

  const { data: request } = useAdminGetProfileVerificationQuery(
    { id },
    { enabled: typeof id === "string" }
  );

  return (
    <section>
      <AdminListTable
        onBack={() => back()}
        data={[]}
        headers={[]}
        title={t("Account Verification")}
      >
        <Table TrProps={{ className: "border-b" }} className="w-full text-xl">
          <Tr>
            <Td>{t("Photo")}</Td>
            <Td>
              <Avatar className="w-[3rem]" src={request.idPhoto} />
            </Td>
          </Tr>
          <Tr>
            <Td>{t("username")}</Td>
            <Td>{request.username}</Td>
          </Tr>
          <Tr>
            <Td>{t("full name")}</Td>
            <Td>{request.fullName}</Td>
          </Tr>
          <Tr>
            <Td>{t("ID Photo")}</Td>
            <Td>
              <Image
                className="w-[9rem] h-[7rem]"
                src={request.idPhoto}
                alt=""
              ></Image>
            </Td>
          </Tr>
        </Table>
      </AdminListTable>
    </section>
  );
};

export default View;
