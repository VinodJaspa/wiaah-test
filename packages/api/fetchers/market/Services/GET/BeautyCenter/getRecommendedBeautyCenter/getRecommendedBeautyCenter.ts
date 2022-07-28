import { QueryPaginationInputs } from "../../../../../../";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";
import {
  InferType,
  RecommendedBeautyCenterData,
  RecommendedBeautyCenterApiResponseData,
  CheckValidation,
} from "validation";

export type RecommendedBeautyCenterDataType = InferType<
  typeof RecommendedBeautyCenterData
>;

export type getRecommendedBeautyCentersApiResponse = InferType<
  typeof RecommendedBeautyCenterApiResponseData
>;

export const getRecommendedBeautyCenterFetcher = async (
  pagination: QueryPaginationInputs
): Promise<getRecommendedBeautyCentersApiResponse> => {
  const res: AsyncReturnType<typeof getRecommendedBeautyCenterFetcher> = {
    data: [...Array(pagination.take)].map(() => ({
      name: "Green Leaf Treatments",
      rate: randomNum(5),
      reviews: randomNum(1565),
      owners: ["Perry", "Birmingham"],
      thumbnail:
        "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/Tacha+Beauty+Center-desktop.jpg",
    })),
    hasMore: false,
    total: randomNum(156),
  };

  return CheckValidation(RecommendedBeautyCenterApiResponseData, res);
};
