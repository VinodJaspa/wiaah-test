import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  EditIcon,
  InputRequiredStar,
  Table,
  TableContainer,
  TBody,
  Td,
  Tr,
} from "ui";

const EditSlideShowPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="border border-gray-300">
        <div className="flex text-xl items-center gap-2">
          <EditIcon />
          <p>{t("Add Banner")}</p>
        </div>
        <TableContainer>
          <Table>
            <TBody>
              <Tr>
                <Td>
                  <InputRequiredStar />
                  <p>{t("Banner name")}</p>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default EditSlideShowPage;
