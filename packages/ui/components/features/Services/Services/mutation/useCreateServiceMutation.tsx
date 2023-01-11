import { createGraphqlRequestClient } from "api";
import { ServicesType } from "types";
import { useMutation } from "react-query";

export function useCreateServiceMutation<
  TVars extends { serviceType: ServicesType }
>() {
  const client = createGraphqlRequestClient();

  return useMutation<unknown, unknown, TVars, any>("createService", (data) => {
    switch (data.serviceType) {
      case "hotel":
        client.setQuery(`
                mutation createHotel($input:CreateHotelInput!){
                    createHotelService (
                        createHotelServiceArgs:$input
                    ){
                        id
                    }
                }
                `);

        break;
      case "restaurant":
        client.setQuery(
          `
        mutation createRestaurant(
            $args:CreateRestaurantInput!
        ){
            createRestaurantService(
                createRestaurantArgs:$args
            ){
            id   
            }
        }
`
        );
        break;

      case "health_center":
        client.setQuery(`
        mutation createHealthCenter($args:CreateHealthCenterInput!){
            createHealthCenter(
                createHealthCenterArgs:$args
            ){
                id
            }
        }
`);
        break;
      case "beauty_center":
        client.setQuery(`
        mutation createBeautyCenter($args:CreateBeautyCenterInput!){
            createBeautyCenter(
                createBeautyCenterArgs:$args
            ){
                id
            }
        }
        `);
        break;
      case "vehicle":
        client.setQuery(`
        mutation createVehicle($args:CreateVehicleServiceInput!){
            createVehicle(
                createVehicleInput:$args
            ) {
                id
            }
        }
        `);

      default:
        break;
    }

    return client.setVariables(data as any).send();
  });
}
