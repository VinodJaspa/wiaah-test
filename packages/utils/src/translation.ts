import { StringTranslationField } from "@features/API";

export function getStringValue(input: string | StringTranslationField[] | undefined): string {
  if (!input) return ""; // fallback
  if (typeof input === "string") return input;
  if (Array.isArray(input) && input.length > 0) return input[0].value;
  return "";
}