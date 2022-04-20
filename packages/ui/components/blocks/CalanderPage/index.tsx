import React from "react";
import { Flex, Spacer, Text, Box, VStack } from "@chakra-ui/react";

export interface CalanderPageProps {
  date: number;
}

export const CalanderPage: React.FC<CalanderPageProps> = ({ date }) => {
  const [day, setDay] = React.useState<string>("");
  const [numericDay, setNumericDay] = React.useState<Number>();
  const [month, setMonth] = React.useState<string>("");
  React.useEffect(() => {
    const day = new Date(date).toLocaleDateString("Default", {
      weekday: "short",
    });
    setDay(day);
    const numericDay = new Date(date).toLocaleDateString("Default", {
      day: "numeric",
    });
    setNumericDay(Number(numericDay));
    const month = new Date(date).toLocaleDateString("Default", {
      month: "long",
    });
    setMonth(month);
  }, []);
  return (
    <Flex direction={"column"} borderWidth={"1px"} borderColor="#4A4A4A">
      <Box px={"3rem"} py="0.5rem" bg="#4A4A4A">
        <Text color="white">{day.toUpperCase()}</Text>
      </Box>
      <Text fontSize={"xl"} fontWeight={"bold"} color="#4A4A4A">
        <Flex direction={"column"} alignItems="center" gap="0.5rem" py="0.5rem">
          <Text>{numericDay}</Text>
          <Text>{month}</Text>
        </Flex>
      </Text>
    </Flex>
  );
};
