import { Flex, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useDateDiff } from "ui/Hooks";
import React, { useEffect, useState } from "react";

export interface CountdownProps {
  days?: boolean;
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
  toDate: Date;
  fromDate?: Date;
}

export const Countdown: React.FC<CountdownProps> = ({
  days,
  hours,
  minutes,
  seconds,
  fromDate = new Date(Date.now()),
  toDate,
}) => {
  const {
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
  } = useDateDiff({ from: fromDate, to: toDate });
  const [interval, setInterval] = useState(false);
  const All = !days && !hours && !minutes && !seconds;

  useEffect(() => {
    setTimeout(() => {
      setInterval((_) => !_);
    }, 1000);
  }, [interval]);

  return (
    <SimpleGrid
      // flexWrap={"wrap"}
      gap="1rem"
      color="#fff"
      w="100%"
      columns={{ base: 2, md: 4 }}
    >
      {(All || days) && (
        <Flex direction={"column"} alignItems="center" fontSize={"1.5rem"}>
          <Text fontWeight={"bold"} fontSize="3xl">
            {d}
          </Text>
          <Text fontWeight={"semibold"} textTransform={"uppercase"}>
            days
          </Text>
        </Flex>
      )}
      {(All || hours) && (
        <Flex direction={"column"} alignItems="center" fontSize={"1.5rem"}>
          <Text fontWeight={"bold"} fontSize="3xl">
            {h}
          </Text>
          <Text fontWeight={"semibold"} textTransform={"uppercase"}>
            hours
          </Text>
        </Flex>
      )}
      {(All || days) && (
        <Flex direction={"column"} alignItems="center" fontSize={"1.5rem"}>
          <Text fontWeight={"bold"} fontSize="3xl">
            {m}
          </Text>
          <Text fontWeight={"semibold"} textTransform={"uppercase"}>
            minutes
          </Text>
        </Flex>
      )}
      {(All || days) && (
        <Flex direction={"column"} alignItems="center" fontSize={"1.5rem"}>
          <Text fontWeight={"bold"} fontSize="3xl">
            {s}
          </Text>
          <Text fontWeight={"semibold"} textTransform={"uppercase"}>
            seconds
          </Text>
        </Flex>
      )}
    </SimpleGrid>
  );
};
