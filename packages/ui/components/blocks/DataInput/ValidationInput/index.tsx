import { Flex, Input, InputProps, Text } from "@chakra-ui/react";
import React from "react";
import { AnySchema } from "yup";
export interface ValidationInputProps extends InputProps {
  validationSchema: AnySchema;
}

export const ValidationInput: React.FC<ValidationInputProps> = ({
  validationSchema,
  ...props
}) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <Flex direction={"column"}>
      <Input {...props} />
      <Text></Text>
    </Flex>
  );
};
