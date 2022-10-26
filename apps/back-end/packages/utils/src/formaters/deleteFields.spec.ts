import { ExcludeFieldsFromObject } from "./deleteFields";
describe("delete fields tests", () => {
  it("delete fields", () => {
    const obj = {
      test1: "1324",
      test2: "1324",
      test3: "1324",
      test4: "1324",
      test5: "1324",
      test6: "1324",
    };

    const newobj = ExcludeFieldsFromObject(obj, ["test1", "test4"]);

    expect(newobj).toStrictEqual({
      test2: "1324",
      test3: "1324",
      test5: "1324",
      test6: "1324",
    });
  });
});
