import React from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  Table,
  Tr,
  Td,
  VStack,
  Thead,
  Tbody,
  Image,
  AspectRatio,
  HStack,
} from "@chakra-ui/react";
import { CalanderPage, ChecklistIcon } from "ui";
import { t } from "i18next";
import { Service } from "types/market/Booking";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { QRCodeSVG } from "qrcode.react";

export interface BookConfirmationViewProps {
  service: Service;
}

export const BookConfirmationView: React.FC<BookConfirmationViewProps> = ({
  service: {
    location,
    serviceName,
    serviceOwner,
    serviceThumbnail,
    contacts,
    rooms,
  },
}) => {
  const bookId = "45DG9QY";

  return (
    <Flex py="4rem" gap="2rem" direction={"column"}>
      <Box boxShadow="md" width={"100%"} p={"5rem"} bg="#F2f9F6">
        <Flex gap="1rem" alignItems={"center"}>
          <Box w={"5rem"} color="#77CF92">
            <ChecklistIcon fill="#77CF92" />
          </Box>
          <Flex direction="column">
            <Text fontWeight={"bold"}>
              {t("booking_confirmed", "Booking Confirmed")}
            </Text>
            <Text>
              {t(
                "we_have_booked",
                "We have booked your spot for the selected date at the selected facility. Please arrive at the facility in due date and show the below QR code or Book Number at the counter"
              )}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        alignItems={"center"}
        direction={{ sm: "column", lg: "row" }}
        gap="10rem"
      >
        <Flex w="100%" gap={"2rem"} direction="column">
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            {t("checkin_details", "Checkin Details")}
          </Text>
          <Flex px="1.5rem">
            <Flex gap="1rem">
              {/* book qr and number  */}
              <Box w="10rem">
                <QRCodeSVG size={"100%"} value={bookId} />
              </Box>
              <Flex direction="column">
                <Flex direction="column">
                  {t("booking_number", "Booking Number")}
                  <Text fontWeight={"bold"}>#{bookId}</Text>
                </Flex>
                <Spacer />
                <Button colorScheme={"cyan"} variant="outline">
                  {t("save_the_qr", "Save the QR")}
                </Button>
              </Flex>
            </Flex>
            <Spacer />
            <Flex gap="4rem">
              <Box>
                <Text py="5px" fontSize={"lg"}>
                  {t("checkin", "Checkin")}
                </Text>
                <CalanderPage date={Date.now()} />
              </Box>
              <Box>
                <Text py="5px" fontSize={"lg"}>
                  {t("checkout", "Checkout")}
                </Text>
                <CalanderPage date={Date.now()} />
              </Box>
            </Flex>
          </Flex>
          <Flex color={"#4A4A4A"} gap="3rem" direction={"column"}>
            {/* checkin details */}
            <Box>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {t("room_fare_breakup", "Room Fare Breakup")}
              </Text>
              <Table>
                <Thead>
                  <Tr>
                    <Td>Room Type</Td>
                    <Td textAlign={"end"}>Room Price</Td>
                    <Td textAlign={"end"}>Total</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {rooms.map((room, i) => (
                    <Tr>
                      <Td>
                        <Text>Room Type {room.type}</Text>
                      </Td>
                      <Td textAlign={"end"}>
                        <Text>
                          {room.nightPrice}*{room.nights}
                        </Text>
                      </Td>
                      <Td textAlign={"end"}>{room.nightPrice * room.nights}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Flex>
        <Flex fontSize={"xl"} w="40rem" gap="0.5rem" direction={"column"}>
          {/* hotel details */}
          <AspectRatio w={"100%"} ratio={9 / 10}>
            <Image src={serviceThumbnail} objectFit="cover" />
          </AspectRatio>
          <Text fontWeight={"bold"} color="4A4A4A" fontSize={"2xl"}>
            {serviceName}
          </Text>
          <Flex gap="0.5rem">
            Owner:
            <Text color="4A4A4A" fontWeight={"bold"}>
              {serviceOwner}
            </Text>
          </Flex>
          <HStack>
            <IoLocation />
            <Flex direction={"column"}>
              <Text>{location.streetName}</Text>
              <Text>
                {location.city}-{location.streetNumber}
              </Text>
            </Flex>
          </HStack>
          {contacts && (
            <>
              {contacts.phone && (
                <HStack>
                  <IoCall />
                  <Text>{contacts.phone}</Text>
                </HStack>
              )}
              {contacts.email && (
                <HStack>
                  <MdEmail />
                  <Text>{contacts.email}</Text>
                </HStack>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
