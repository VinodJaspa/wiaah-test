import { object, string } from "yup";
import { CreatePaginationApiResponseValidationSchemaOf } from "../../SharedSchema";

// export type Recommendation =
//   | {
//       type: "hotel";
//       data: InferType<typeof HotelMetaDataValidationSchema>;
//     }
//   | {
//       type: "resturant";
//       data: InferType<typeof ResturantMetaDataValidationSchema>;
//     }
//   | {
//       type: "health_center";
//       data: InferType<typeof HealthCenterPractitionerDataValidationSchema>;
//     }
//   | {
//       type: "vehicle";
//       data: InferType<typeof VehicleDataValidationSchema>;
//     }
//   | {
//       type: "beauty_center";
//       data: InferType<typeof RecommendedBeautyCenterData>;
//     }
//   | {
//       type: "shop";
//       data: InferType<typeof ShopMapSearchDataValidationSchema>;
//     };

// function RecommendationValidationSchema<TSchema extends AnySchema>(
//   schema: TSchema
// ) {
//   return object({
//     type: string().required(),
//     data: schema.required(),
//   });
// }

export const RecommendedShopsApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    object({
      name: string().required(),
      thumbnail: string().required(),
      type: string().required(),
      label: string().required(),
      id: string().required(),
    })
  );
// CreatePaginationApiResponseValidationSchemaOf(
//   mixed<Recommendation>()
//     .when({
//       is: (v: Recommendation) => v.type === "hotel",
//       then(schema) {
//         return RecommendationValidationSchema(
//           HotelMetaDataValidationSchema
//         ).required();
//       },
//     })
//     .when({
//       is: (v: Recommendation) => v.type === "resturant",
//       then(schema) {
//         return RecommendationValidationSchema(
//           ResturantMetaDataValidationSchema
//         ).required();
//       },
//     })
//     .when({
//       is: (v: Recommendation) => v.type === "health_center",
//       then(schema) {
//         return RecommendationValidationSchema(
//           HealthCenterPractitionerDataValidationSchema
//         ).required();
//       },
//     })
//     .when({
//       is: (v: Recommendation) => v.type === "vehicle",
//       then(schema) {
//         return RecommendationValidationSchema(
//           VehicleSearchDataValidationSchema
//         ).required();
//       },
//     })
//     .when({
//       is: (v: Recommendation) => v.type === "beauty_center",
//       then(schema) {
//         return RecommendationValidationSchema(
//           RecommendedBeautyCenterData
//         ).required();
//       },
//     })
// );
