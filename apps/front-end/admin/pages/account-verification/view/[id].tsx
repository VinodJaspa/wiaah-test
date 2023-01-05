import { AdminListTable, AdminTableCellTypeEnum } from "@components";
import { Avatar, Image, Table, Td, Tr } from "@partials";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

interface AccountVerification {
  photo: string;
  username: string;
  fullName: string;
  idPhoto: string;
  id: string;
}

const View = () => {
  const { getParam, back } = useRouting();
  const { t } = useTranslation();

  const id = getParam("id");

  const account: AccountVerification = {
    id: "1",
    fullName: "test full name",
    photo: getRandomImage(),
    idPhoto: getRandomImage(),
    username: "test username",
  };

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
              <Avatar className="w-[3rem]" src={account.photo} />
            </Td>
          </Tr>
          <Tr>
            <Td>{t("username")}</Td>
            <Td>{account.username}</Td>
          </Tr>
          <Tr>
            <Td>{t("full name")}</Td>
            <Td>{account.fullName}</Td>
          </Tr>
          <Tr>
            <Td>{t("ID Photo")}</Td>
            <Td>
              <Image
                className="w-[9rem] h-[7rem]"
                src={account.idPhoto}
              ></Image>
            </Td>
          </Tr>
        </Table>
      </AdminListTable>
    </section>
  );
};

export default View;
