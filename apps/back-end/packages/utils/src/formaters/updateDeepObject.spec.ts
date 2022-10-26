import { updateDeepObject } from "./updateDeepObject";

describe("updateDeepObject", () => {
  it("should update 1 level object", () => {
    const oldObj = {
      test1: "123",
      test2: "456",
    };
    const updateObj = {
      test1: "321",
    };

    const newObj = updateDeepObject({
      inputObj: oldObj,
      updateObj: updateObj,
    });

    expect(newObj).toStrictEqual({
      test1: "321",
      test2: "456",
    });
  });

  it("should update 2 level nested object", () => {
    const oldObj = {
      test1: "123",
      test2: "456",
      test3: {
        test1: "147",
        test2: "369",
      },
    };
    const updateObj = {
      test1: "321",
      test3: {
        test2: "963",
      },
    };

    const newObj = updateDeepObject({
      inputObj: oldObj,
      updateObj: updateObj,
    });

    expect(newObj).toStrictEqual({
      test1: "321",
      test2: "456",
      test3: {
        test1: "147",
        test2: "963",
      },
    });
  });

  it("should not present any new fields from the updated obj to the input obj", () => {
    const oldObj = {
      test1: "123",
      test2: "456",
      test3: {
        test1: "147",
        test2: "369",
      },
    };
    const updateObj = {
      test1: "321",
      test3: {
        test2: "963",
        test3: "312654",
      },
      test4: "13456",
    };

    const newObj = updateDeepObject({
      inputObj: oldObj,
      updateObj: updateObj,
    });

    expect(newObj).toStrictEqual({
      test1: "321",
      test2: "456",
      test3: {
        test1: "147",
        test2: "963",
      },
    });
  });

  it("should update deep objects with arrays of objects", () => {
    const oldObj = {
      test1: "123",
      test2: "456",
      test3: {
        test1: "147",
        test2: "369",
      },
      test4: [
        {
          test: "Test",
        },
        {
          test: "test1",
        },
      ],
    };
    const updateObj = {
      test1: "321",
      test3: {
        test2: "963",
        test3: "312654",
      },
      test4: [
        {
          test: "updated test",
        },
      ],
    };

    const newObj = updateDeepObject({
      inputObj: oldObj,
      updateObj: updateObj,
    });

    expect(newObj).toStrictEqual({
      test1: "321",
      test2: "456",
      test3: {
        test1: "147",
        test2: "963",
      },
      test4: [
        {
          test: "updated test",
        },
        {
          test: "test1",
        },
      ],
    });
  });
});
