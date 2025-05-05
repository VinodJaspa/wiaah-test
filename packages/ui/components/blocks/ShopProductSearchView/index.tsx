
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@partials";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { BsFillGridFill } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { PiNavigationArrowFill } from "react-icons/pi";
import * as z from "zod";
import { FormField } from "./FormField";
import { ShadcnFlex } from "@UI/components/shadcn-components";

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  color: z.string().min(1, {
    message: "Please select a color.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ShopProductSearchForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      color: "",
      category: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const dropdownArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' stroke-width='2' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M4 6l4 4 4-4' /%3E%3C/svg%3E")`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 py-[15px] px-[30px] rounded-[12px]"
    >
    <ShadcnFlex className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-[200px]">
          <FormField
            name="location"
            control={control}
            leftElement={
              <PiNavigationArrowFill
                className="scale-x-[-1] text-primary"
                size={20}
              />
            }
          >
            <input
              type="text"
              placeholder="Location..."
              className="bg-gray-50 w-full pl-[50px] placeholder:text-[14px] placeholder:text-gray-500 border-none focus-within:ring-0"
            />
          </FormField>
        </div>

        <span className="bg-gray-200 h-[38px] w-px"></span>

        <div className="flex-1 min-w-[200px]">
          <FormField
            name="color"
            control={control}
            leftElement={
              <IoMdColorPalette className="text-primary" size={20} />
            }
          >
            <select
              required
              className="bg-gray-50 w-full pl-[50px] pr-10 border-none focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] [&:invalid]:text-gray-500 [&:invalid]:text-[14px]"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">Color...</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
          </FormField>
        </div>

        <span className="bg-gray-200 h-[38px] w-px"></span>

        <div className="flex-1 min-w-[200px]">
          <FormField
            name="category"
            control={control}
            leftElement={<BsFillGridFill size={20} className="text-primary" />}
          >
            <select
              required
              className="bg-gray-50 w-full pl-[50px] pr-10 border-none focus-within:ring-0 appearance-none bg-no-repeat bg-right-center bg-[length:16px] [&:invalid]:text-gray-500 [&:invalid]:text-[14px]"
              style={{ backgroundImage: dropdownArrow }}
            >
              <option value="">Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
            </select>
          </FormField>
        </div>

        <Button
          type="submit"
          className="flex items-center gap-2 text-base font-medium"
        >
          <Search size={20} /> Search
        </Button>
      </ShadcnFlex>
    </form>
  );
}
