import { DeepPartial } from "src/types";
import { mergeObjectArray } from "./mergeObjectArray";

type TestData = {
  id: string;
  test1: string;
  test2: {
    test: string;
    test1: number;
  };
};

type TestUpdateData = DeepPartial<Omit<TestData, "id">> & Pick<TestData, "id">;

describe("mergeObjectArray tests", () => {
  it("should merge two array of objects properly", () => {
    const obj1: TestData[] = [
      {
        id: "1",
        test1: "test 1",
        test2: {
          test: "test",
          test1: 15,
        },
      },
      {
        id: "2",
        test1: "test 2",
        test2: {
          test: "test 2",
          test1: 20,
        },
      },
      {
        id: "3",
        test1: "test 3",
        test2: {
          test: "test 3",
          test1: 11,
        },
      },
    ];

    const obj2: TestUpdateData[] = [
      {
        id: "1",
        test1: "updated test",
      },
      {
        id: "2",
        test2: {
          test1: 30,
        },
      },
      {
        id: "4",
        test1: "test 4",
        test2: {
          test: "test 4",
          test1: 40,
        },
      },
      {
        id: "5",
        test1: "test 5",
        test2: {
          test: "test 5",
          test1: 50,
        },
      },
    ];

    const { existingObjects, newObjects, unTouchedObjects } = mergeObjectArray({
      originalData: obj1,
      updateData: obj2,
      compareKey: "id",
    });

    console.log(
      JSON.stringify({ existingObjects, newObjects, unTouchedObjects }, null, 2)
    );

    expect(existingObjects).toStrictEqual([
      {
        id: "1",
        test1: "updated test",
        test2: {
          test: "test",
          test1: 15,
        },
      },
      {
        id: "2",
        test1: "test 2",
        test2: {
          test: "test 2",
          test1: 30,
        },
      },
    ]);

    expect(newObjects).toStrictEqual([
      {
        id: "4",
        test1: "test 4",
        test2: {
          test: "test 4",
          test1: 40,
        },
      },
      {
        id: "5",
        test1: "test 5",
        test2: {
          test: "test 5",
          test1: 50,
        },
      },
    ]);

    expect(unTouchedObjects).toStrictEqual([
      {
        id: "3",
        test1: "test 3",
        test2: {
          test: "test 3",
          test1: 11,
        },
      },
    ]);
  });
});
