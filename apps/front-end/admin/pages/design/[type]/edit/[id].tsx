import { LanguageSelector } from "components/views/sellers/LanguageSelector";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  EditIcon,
  FlagIcon,
  Image,
  Input,
  InputRequiredStar,
  Select,
  SelectOption,
  SimpleTabHead,
  SimpleTabItemList,
  SimpleTabs,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "ui";
import {
  mapArray,
  WiaahLanguageCountries,
  WiaahLanguageCountriesIsoCodes,
} from "utils";

interface Slideshowitem {
  title: string;
  link: string;
  sortOrder: number;
  id: string;
}

const FAKE_SLIDES: Slideshowitem[] = [
  {
    title: "Slide 1",
    link: "https://example.com/slide1.jpg",
    sortOrder: 1,
    id: "1",
  },
  {
    title: "Slide 2",
    link: "https://example.com/slide2.jpg",
    sortOrder: 2,
    id: "2",
  },
];

const EditSlideShowPage: NextPage = () => {
  const { t }: { t: (key: string, ...args: any[]) => string } =
    useTranslation();

  return (
    <section>
      <div className="border border-gray-300">
        <div className="p-4 flex text-xl items-center gap-2">
          <EditIcon />
          <p>{t("Add Banner")}</p>
        </div>
        <div className="p-4">
          <TableContainer>
            <Table className="w-full">
              <TBody>
                <Tr>
                  <Td>
                    <div className="flex items-center ">
                      <InputRequiredStar />
                      <p>{t("Banner name")}</p>
                    </div>
                  </Td>
                  <Td>
                    <Input
                      className="w-full"
                      placeholder={t("Banner Name")}
                    ></Input>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <div className="flex items-center ">
                      <InputRequiredStar />
                      <p>{t("Status")}</p>
                    </div>
                  </Td>
                  <Td>
                    <Select className="w-full">
                      <SelectOption value={"enabled"}>
                        {t("Enabled")}
                      </SelectOption>
                      <SelectOption value={"disabled"}>
                        {t("Disabled")}
                      </SelectOption>
                    </Select>
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </TableContainer>

          <SimpleTabs>
            <div className="flex flex-wrap">
              <SimpleTabHead>
                <LanguageSelector
                  WiaahLanguageCountriesIsoCodes={
                    WiaahLanguageCountriesIsoCodes
                  }
                />
              </SimpleTabHead>
            </div>
            <SimpleTabItemList>
              <TableContainer>
                <Table
                  TdProps={{ className: "border border-gray-300" }}
                  className="w-full"
                >
                  <THead>
                    <Tr>
                      <Th className="w-32">
                        <p>{t("Image")}</p>
                      </Th>
                      <Th>
                        <div className="flex items-center">
                          <InputRequiredStar />
                          <p>{t("Title")}</p>
                        </div>
                      </Th>
                      <Th>
                        <p>{t("Link")}</p>
                      </Th>
                      <Th>
                        <p>{t("Sort Order")}</p>
                      </Th>
                      <Th></Th>
                    </Tr>
                  </THead>
                  <TBody>
                    {mapArray(FAKE_SLIDES, ({ id, link, sortOrder, title }) => (
                      <Tr>
                        <Td>
                          <Image src={link} alt="" />
                        </Td>
                        <Td>{title}</Td>
                        <Td>{link}</Td>
                        <Td>{`${sortOrder}`}</Td>
                        <Td>
                          <Button
                            colorScheme="danger"
                            className="fill-white text-2xl text-white w-8 h-8 flex justify-center items-center"
                          >
                            -
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td>
                        <Button className="fill-white text-2xl text-white w-8 h-8 flex justify-center items-center">
                          +
                        </Button>
                      </Td>
                    </Tr>
                  </TBody>
                </Table>
              </TableContainer>
            </SimpleTabItemList>
          </SimpleTabs>
        </div>
      </div>
    </section>
  );
};

export default EditSlideShowPage;
