import { FormField } from "@blocks/ShopProductSearchView/FormField";
import {
  Box,
  Flex,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NikeIcon } from "@partials";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { PiCaretUpDownFill } from "react-icons/pi";
import { z } from "zod";

const filterSchema = z.object({
  status: z.string().optional(),
  brand: z.string().optional(),
  shipping: z.string().optional(),
  size: z.string().optional(),
  rating: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

export function ShopProductFilterView() {
  const { control, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: FilterValues) => {
    console.log(data);
  };

  const dropdownArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' stroke-width='2' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M4 6l4 4 4-4' /%3E%3C/svg%3E")`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={4} flexWrap="wrap">
        {/* Status */}
        <Box flex="1">
          <FormLabel fontSize="sm">Status</FormLabel>
          <FormField
            name="status"
            control={control}
            leftElement={
              <div className="pl-[30px] pr-[10px] flex items-center gap-[10px]">
                <Clock className="text-gray-300" size={20} />
                <span className="w-px h-5 bg-gray-300"></span>
              </div>
            }
          >
            <select
              className="bg-white w-full pl-[60px] pr-[10px] border border-gray-100 rounded-[6px] focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] text-gray-500 text-[14px] focus-within:ring-0 h-10"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">Available</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </FormField>
        </Box>
        {/* Brand */}
        <Box flex="1">
          <FormLabel fontSize="sm">Brand</FormLabel>
          <FormField
            name="brand"
            control={control}
            leftElement={
              <div className="pl-[30px] pr-[10px] flex items-center gap-[10px]">
                <NikeIcon className="text-gray-300" />
                <span className="w-px h-5 bg-gray-300"></span>
              </div>
            }
          >
            <select
              className="bg-white w-full pl-[60px] pr-[10px] border border-gray-100 rounded-[6px] focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] text-gray-500 text-[14px] focus-within:ring-0 h-10"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">Nike</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
            </select>
          </FormField>
        </Box>
        {/* Shipping */}
        <Box flex="1">
          <FormLabel fontSize="sm">Shipping</FormLabel>
          <FormField name="shipping" control={control}>
            <select
              className="bg-white w-full pl-[10px] pr-[10px] border border-gray-100 rounded-[6px] focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] text-gray-500 text-[14px] focus-within:ring-0 h-10"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">Click and collect</option>
              <option value="click-collect">Click and collect</option>
              <option value="delivery">Delivery</option>
            </select>
          </FormField>
        </Box>
        {/* Size */}
        <Box flex="1">
          <FormLabel fontSize="sm">Size</FormLabel>
          <FormField name="size" control={control}>
            <select
              className="bg-white w-full pl-[10px] pr-[10px] border border-gray-100 rounded-[6px] focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] text-gray-500 text-[14px] focus-within:ring-0 h-10"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">Extra Large</option>
              <option value="xs">Extra Small</option>
              <option value="s">Small</option>
              <option value="m">Medium</option>
              <option value="l">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </FormField>
        </Box>
        {/* Rating */}
        <Box flex="1">
          <FormLabel fontSize="sm">Rating</FormLabel>
          <FormField name="rating" control={control}>
            <select
              className="bg-white w-full pl-[10px] pr-[10px] border border-gray-100 rounded-[6px] focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] text-gray-500 text-[14px] focus-within:ring-0 h-10"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">5 stars</option>
              <option value="5">5 stars</option>
              <option value="4">4+ stars</option>
              <option value="3">3+ stars</option>
            </select>
          </FormField>
        </Box>
        {/* Price Range */}
        <Box flex="1">
          <FormLabel fontSize="sm">Price</FormLabel>
          <FormField name="priceRange" control={control}>
            <Flex gap={2} align="center">
              <NumberInput min={0} className="w-full">
                <InputGroup>
                  <NumberInputField
                    placeholder="Min"
                    className="bg-white w-full pl-[30px] pr-[30px] border border-gray-100 rounded-[6px] focus-within:ring-0 text-gray-500 text-[14px] h-10"
                  />
                  <InputRightElement>
                    <Icon
                      as={PiCaretUpDownFill}
                      w={5}
                      h={5}
                      cursor="pointer"
                      color="gray.500"
                    />
                  </InputRightElement>
                </InputGroup>
              </NumberInput>
              <NumberInput min={0} className="w-full">
                <InputGroup>
                  <NumberInputField
                    placeholder="Max"
                    className="bg-white w-full pl-[30px] pr-[30px] border border-gray-100 rounded-[6px] focus-within:ring-0 text-gray-500 text-[14px] h-10"
                  />
                  <InputRightElement>
                    <Icon
                      as={PiCaretUpDownFill}
                      w={5}
                      h={5}
                      cursor="pointer"
                      color="gray.500"
                    />
                  </InputRightElement>
                </InputGroup>
              </NumberInput>
            </Flex>
          </FormField>
        </Box>
      </Flex>
    </form>
  );
}
