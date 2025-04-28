import { createGraphqlRequestClient } from "api";
import { ServiceType } from "@features/Services/Services";
import { useMutation } from "react-query";

export function useAdminUpdateServiceMutation<
  TVars extends { serviceType: ServiceType }
>() {
  const client = createGraphqlRequestClient();

  return useMutation<unknown, unknown, TVars, any>("updateService", (data) => {
    switch (data.serviceType) {
      case "hotel":
        client.setQuery(`
            mutation adminUpdateHotel(
                $args:updateHotelAdminInput!
            ){
                updateHotelAdmin(
                    args:$args
                )
            }
            `);

        break;
      case "restaurant":
        client.setQuery(
          `
        mutation adminUpdateRestaurant(
            $args:updateRestaurantAdminInput!
        ){
            updateRestaurantAdmin(
                args:$args
            )
        }
`
        );
        break;

      case "health_center":
        client.setQuery(`
        mutation adminUpdateHealthCenter(
            $args:updateHealthCenterAdminInput!
        ){
            updateHealthCenterAdmin(
                args:$args
            )
        }
        `);
        break;
      case "beauty_center":
        client.setQuery(`
        mutation adminUpdateBeautyCenter(
            $args:updateBeautyCenterAdminInput!
        ){
            updateBeautyCenterAdmin(
                args:$args
            )
        }
        `);
        break;
      case "vehicle":
        client.setQuery(`
        mutation adminUpdateVehicle(
            $args:updateVehicleAdminInput!
        ){
            updateVehicleAdmin(
                args:$args
            )
        }
        `);
        break;

      default:
        return null;
    }

    return client.setVariables(data as any).send();
  });
}
