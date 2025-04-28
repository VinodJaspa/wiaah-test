type TranslationResource = { langId: string; value: any };

export async function testTranslation<TService, TValue>(
  fetchingClass: TService,
  getTranslationObj: () => Promise<TValue>,
  input: TranslationResource[],
  getLangMethodName: string = "getLang"
) {
  const testingLang: string[] = input.map((v) => v.langId);

  if (typeof jest !== "undefined") {
    for (const lang of testingLang) {
      try {
        jest
          .spyOn(fetchingClass as any, getLangMethodName)
          .mockImplementation(() => lang);
      } catch (error) {
        throw new Error(
          "jest failed to mock the language extracting function, make sure you have provided the right function name and that its end return is the lang string id"
        );
      }

      const data = await getTranslationObj();
      if (!data)
        throw new Error(
          "couldnt found expected transaltion resource of langId:" + lang
        );

      expect(data).toStrictEqual(input.find((v) => v.langId === lang)?.value);
    }
  }
}
