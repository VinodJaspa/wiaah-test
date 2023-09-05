import { Exact, SellerSalesType, StatsRetrivePeriod } from "@features/API";
import { createGraphqlRequestClient } from "api";

export type GetSellerSalesStatisticsQueryVariables = Exact<{
  period: StatsRetrivePeriod;
  sellerId: string;
  type: SellerSalesType;
}>;

export type GetSellerSalesStatisticsQuery = {
  __typename?: "Query";
  getSellerStats: Array<{
    __typename?: "SellerSalesStat";
    affiliations: number;
    affiliationsAmount: number;
    id: string;
    purchasesAmount: number;
    purchases: number;
    returns: number;
    returnsAmount: number;
    sales: number;
    salesAmount: number;
  }>;
};

export const useGetSellerSalesStatsQuery = async (
  args: GetSellerSalesStatisticsQueryVariables
) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getSellerSalesStatistics(
    $period:StatsRetrivePeriod!
    $sellerId:String!
    $type:SellerSalesType!
){
    getSellerStats(
        period:$period,
        sellerId:$sellerId,
        type:$type
    ){
        affiliations
        affiliationsAmount
        id
        purchasesAmount
        purchases
        returns
        returnsAmount
        sales
        salesAmount
    }
}`
    )
    .setVariables<GetSellerSalesStatisticsQueryVariables>(args)
    .send<GetSellerSalesStatisticsQuery>();

  return res.data;
};
