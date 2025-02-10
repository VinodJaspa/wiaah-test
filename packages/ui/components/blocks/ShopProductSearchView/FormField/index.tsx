import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Controller, type Control } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label?: string;
  control: Control<any>;
  children: ReactNode;
  leftElement?: ReactNode;
}

export function FormField({
  name,
  label,
  control,
  children,
  leftElement,
}: FormFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          {label && <FormLabel>{label}</FormLabel>}
          <InputGroup>
            {leftElement && (
              <InputLeftElement pointerEvents="none" color="gray.400">
                {leftElement}
              </InputLeftElement>
            )}
            {children}
          </InputGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
