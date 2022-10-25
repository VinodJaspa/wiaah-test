import { DeepPartial } from "../";
import { TranslationResource } from "./getTranslatedResource";
import { updateTranslationResource } from "./updateTransaltionResource";

type TransObj = {
  test1: string;
  test3: string;
  test2: { test: string; test1: string };
};

describe("updateTransaltionResource tests", () => {
  it("should update transation array properly without inserting any new transaltions", () => {
    const inputTranslations: TranslationResource<TransObj>[] = [
      {
        langId: "en",
        value: {
          test1: "en test",
          test3: "en test 3",
          test2: {
            test: "en n test",
            test1: "en n test 1",
          },
        },
      },
      {
        langId: "es",
        value: {
          test1: "es test",
          test3: "es test 3",
          test2: {
            test: "es n test",
            test1: "es n test 1",
          },
        },
      },
      {
        langId: "fr",
        value: {
          test1: "fr test",
          test3: "fr test 3",
          test2: {
            test: "fr n test",
            test1: "fr n test 1",
          },
        },
      },
    ];

    const updatedTranslations: TranslationResource<DeepPartial<TransObj>>[] = [
      {
        langId: "es",
        value: {
          test3: "es updated test 3",
          test2: {
            test: "es updated n test",
          },
        },
      },
      {
        langId: "fr",
        value: {
          test3: "fr updated test 3",
          test2: {
            test1: "fr updated n test 1",
          },
        },
      },
      {
        langId: "ge",
        value: {
          test3: "ge updated test 3",
          test2: {
            test1: "ge updated n test 1",
          },
        },
      },
    ];

    const newTranslations = updateTranslationResource({
      originalObj: inputTranslations,
      update: updatedTranslations,
    });

    expect(newTranslations).toStrictEqual([
      {
        langId: "en",
        value: {
          test1: "en test",
          test3: "en test 3",
          test2: {
            test: "en n test",
            test1: "en n test 1",
          },
        },
      },
      {
        langId: "es",
        value: {
          test1: "es test",
          test3: "es updated test 3",
          test2: {
            test: "es updated n test",
            test1: "es n test 1",
          },
        },
      },
      {
        langId: "fr",
        value: {
          test1: "fr test",
          test3: "fr updated test 3",
          test2: {
            test: "fr n test",
            test1: "fr updated n test 1",
          },
        },
      },
    ]);
  });
});
