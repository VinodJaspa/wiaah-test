import {
  Pagination,
  ProductReturnsList,
  useAdminGetAccountReturnsQuery,
  usePaginationControls,
} from "@UI";
import React from "react";
import { useForm } from "utils";

export const AccountReturns: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { pagination, controls } = usePaginationControls();
  const { form } = useForm<
    Parameters<typeof useAdminGetAccountReturnsQuery>[0]
  >({ accountId, pagination });
  const { data } = useAdminGetAccountReturnsQuery(form);
  return (
    <>
      <ProductReturnsList
        items={data.map((v) => ({ ...v, product: v.orderItem.product }))}
      />
      <Pagination controls={controls} />
    </>
  );
};
