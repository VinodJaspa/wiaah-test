import React from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  FlagIcon,
  InputSuggestions,
  Stack,
  Divider,
  Button,
  HStack,
} from "@UI";

export const PhoneNumbersOriginList: {
  code: string;
  phoneEx: string;
  callingCode: string;
}[] = [
  {
    code: "US",
    callingCode: "1",
    phoneEx: "(619) 555-0123",
  },
  {
    code: "CH",
    callingCode: "41",
    phoneEx: "071 234 56 78",
  },
];

export type PhoneNumberValue = {
  number: string;
  code: string;
};

export interface PhoneNumberInputProps {
  value?: PhoneNumberValue;
  onChange?: (value: PhoneNumberValue) => any;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onChange,
  value,
}) => {
  const currentCountry = value
    ? PhoneNumbersOriginList.find((number) => number.code === value.code)
    : PhoneNumbersOriginList[0];

  return (
    <InputGroup className="rounded-[0.5rem]">
      <InputLeftElement>
        <HStack className="border-r border-gray-200">
          <FlagIcon code={currentCountry?.code || ""} />
          <Divider
            className="mx-[0px] border-l-[2px] border-gray-200"
            variant="vert"
          />
          <p>+{currentCountry?.callingCode}</p>
        </HStack>
      </InputLeftElement>
      <Input
        className="rounded-[0.5rem]"
        onChange={(e) =>
          onChange &&
          onChange({ code: value?.code || "", number: e.target.value })
        }
        placeholder={currentCountry?.phoneEx}
        value={value ? value.number : ""}
        type="number"
      />
      <InputSuggestions className="bg-white translate-y-4">
        <Stack col divider={<Divider className="border-gray-200 my-0" />}>
          {PhoneNumbersOriginList.map(({ callingCode, code, phoneEx }, i) => (
            <Button
              className="px-[0.5rem]"
              onClick={() =>
                onChange &&
                onChange({
                  code,
                  number: value?.number || "",
                })
              }
              colorScheme="white"
              key={i}
            >
              <HStack>
                <FlagIcon code={code} />
                <p>+{callingCode}</p>
                <p>{phoneEx}</p>
              </HStack>
            </Button>
          ))}
        </Stack>
      </InputSuggestions>
    </InputGroup>
  );
};
