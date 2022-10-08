export const SnakeCaseToText = (string: string): string => {
  const spacesString = string.replace("_", " ");
  return string[0].toUpperCase() + spacesString.substring(1);
};
