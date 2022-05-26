import { getRandomImage } from "ui/placeholder";
import { randomNum } from "ui/components/helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import {
  AffiliationManagementContext,
  ItemsPagination,
  Button,
  Divider,
  Table,
  TBody,
  Td,
  Tr,
  Th,
} from "ui";

export interface AffiliationListSectionProps {}

export const AffiliationListSection: React.FC<AffiliationListSectionProps> =
  () => {
    const { addNew } = React.useContext(AffiliationManagementContext);
    const [maxItems, setMaxItems] = React.useState<number>(5);
    const { t } = useTranslation();
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            <p className="text-4xl ">
              {t("affiliation_list", "Affiliation List")}
            </p>
            <Button onClick={addNew}>
              {t("add_new_affiliation", "Add New Affilation")}
            </Button>
          </div>
          <Divider className="border-primary" />
        </div>

        <Table className="w-full overflow-scroll">
          <Th>{t("product_image", "Product Image")}</Th>
          <Th>{t("product_id", "Product Id")}</Th>
          <Th>{t("product_name", "Product Name")}</Th>
          <Th>{t("commission", "Commission")} %</Th>
          <Th>{t("expiry_date", "Expiry Date")}</Th>
          <Th>{t("affiliation_link", "Affiliation Link")}</Th>
          <Th>{t("status", "Status")}</Th>
          <Th className="pr-0 text-right">{t("action", "Action")}</Th>
          <TBody>
            {AffiliationLinksPH.slice(0, maxItems).map((link, i) => (
              <Tr key={link.productId}>
                <Td>
                  <img
                    className="w-16 md:w-20 lg:w-24 xl:w-32 h-auto"
                    src={link.productImage}
                    alt={link.productName}
                  />
                </Td>
                <Td>{link.productId}</Td>
                <Td>{link.productName}</Td>
                <Td>{link.commission}</Td>
                <Td>{link.expiryDate}</Td>
                <Td>{link.affiliationLink}</Td>
                <Td>
                  <div className="uppercase p-2 bg-primary text-white">
                    {link.status}
                  </div>
                </Td>
                <Td className="pr-0">
                  <div className="w-full justify-end flex items-center gap-2">
                    <BiEdit className="text-xl cursor-pointer" />
                    <IoTrash className="text-red-700 text-xl cursor-pointer" />
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>

        <ItemsPagination
          currentPage={1}
          onItemsPerPageChange={setMaxItems}
          maxItemsNum={AffiliationLinksPH.length}
        />
      </div>
    );
  };

interface AffiliationLinkData {
  productImage: string;
  productId: string;
  productName: string;
  commission: number;
  expiryDate: string;
  affiliationLink: string;
  status: string;
}

const AffiliationLinksPH: AffiliationLinkData[] = [...Array(15)].map(
  (_, i) => ({
    productImage: getRandomImage(),
    productId: String(randomNum(1000000000)),
    productName: `product - ${i}`,
    commission: randomNum(95),
    expiryDate: new Date(Date.now()).toDateString(),
    affiliationLink: "link",
    status: "active",
  })
);
