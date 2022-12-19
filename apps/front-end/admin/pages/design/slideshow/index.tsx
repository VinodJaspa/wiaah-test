import { NextPage } from "next";
import { getRandomImage } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  EditIcon,
  FlagIcon,
  Image,
  Input,
  InputRequiredStar,
  MinusIcon,
  PlusIcon,
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
import { mapArray, randomNum, WiaahLanguageCountries } from "utils";

interface Slideshowitem {
  title: string;
  link: string;
  sortOrder: number;
  id: string;
}

const EditSlideShowPage: NextPage = () => {
  const { t } = useTranslation();

  const Slides: Slideshowitem[] = [...Array(3)].map((_, i) => ({
    id: i.toString(),
    link: getRandomImage(),
    sortOrder: randomNum(5),
    title: `test title-${i}`,
  }));

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
                {WiaahLanguageCountries.map(
                  ({ code, name }) =>
                    ({ selected, onClick }) =>
                      (
                        <div
                          className={`p-4 w-fit flex items-center gap-1 ${
                            selected ? "border border-b-0 border-gray-300" : ""
                          }`}
                        >
                          <FlagIcon code={code} />
                          <p onClick={onClick} className={""}>
                            {name}
                          </p>
                        </div>
                      )
                )}
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
                    {mapArray(Slides, ({ id, link, sortOrder, title }) => (
                      <Tr>
                        <Td>
                          <Image src={link} />
                        </Td>
                        <Td>{title}</Td>
                        <Td>{link.slice(0, 30)}</Td>
                        <Td>{sortOrder}</Td>
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
