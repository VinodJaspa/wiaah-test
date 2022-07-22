import { PaginationReturnDataValidationSchema } from "../../../SharedSchema";
import { object, string, number, boolean, array, mixed, InferType } from "yup";

export const PaginationDataIndexKey = "data";

type NumiricProps = "passengers" | "windows" | "bags";
type BooleanProps = "a/c" | "gps";

const numiricProps: NumiricProps[] = ["passengers", "windows", "bags"];
const booleanProps: BooleanProps[] = ["a/c", "gps"];

export type AllVehicleProps = NumiricProps | BooleanProps;

const allProps = [...booleanProps, ...numiricProps];

export const VehicleProprtieValidationSchema = object({
  type: mixed<AllVehicleProps>().required().oneOf(allProps),
  value: mixed<boolean | number>().when("type", {
    is: (value: any) => booleanProps.includes(value),
    then: boolean().required(),
    otherwise: number().required(),
  }),
}).required();

export const VehicleSearchDataValidationSchema = object({
  thumbnail: string().required(),
  pricePerDay: number().required(),
  name: string().required(),
  vehicleProps: array<InferType<typeof VehicleProprtieValidationSchema>>()
    .required()
    .of(VehicleProprtieValidationSchema)
    .min(0)
    .required(),
}).required();

export const VehicleSearchApiResponseValidationSchema = object({
  ...PaginationReturnDataValidationSchema,
  [PaginationDataIndexKey]: array()
    .required()
    .of(VehicleSearchDataValidationSchema)
    .min(0)
    .required(),
}).required();
