import { Table, Tr, TBody, THead, Td, Th } from "ui/components/partials/Table";
import { waitFor } from "ui/utils/test-utils";
import { shallow, ShallowWrapper, mount, ReactWrapper } from "enzyme";
import React from "react";

const selectors = {};

describe("Table functional tests", () => {
  let wrapper: ReactWrapper;
  let table: ReactWrapper;
  let tr: ReactWrapper;
  let tbody: ReactWrapper;
  let thead: ReactWrapper;
  let td: ReactWrapper;
  let th: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Table
        ThProps={{
          id: "THID",
          className: "test-classname",
        }}
        TdProps={{
          id: "TDID",
          className: "test-classname",
        }}
        TrProps={{
          id: "TRID",
          className: "test-classname",
        }}
      >
        <THead>
          <Tr className="own-classname">
            <Th className="own-classname">column 1</Th>
            <Th className="own-classname">column 2</Th>
            <Th className="own-classname">column 3</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr className="own-classname">
            <Td className="own-classname">data 1</Td>
            <Td className="own-classname">data 2</Td>
            <Td className="own-classname">data 3</Td>
          </Tr>
        </TBody>
      </Table>
    );
    table = wrapper.find("table");
    tr = wrapper.find("tr");
    td = wrapper.find("td");
    th = wrapper.find("th");
    tbody = wrapper.find("tbody");
    thead = wrapper.find("thead");
  });

  it("THead should render its childs correctly", () => {
    expect(thead.length).toBe(1);
    expect(thead.find("tr").length).toBe(1);
  });
  it("TBody should render its childs correctly", () => {
    expect(tbody.length).toBe(1);
    expect(tbody.find("tr").length).toBe(1);
  });
  it("Table should render its childs correctly", () => {
    expect(table.length).toBe(1);
    expect(table.find("thead").length).toBe(1);
    expect(table.find("tbody").length).toBe(1);
  });
  it("all Th elements should recieve the right props", () => {
    expect(th.length).toBe(3);
    th.map((head, i) => {
      wrapper.update();
      expect(head.prop("id")).toBe("THID");
    });
  });
  it("all Tr elements should recieve the right props", () => {
    expect(tr.length).toBe(2);
    tr.map((head) => {
      expect(head.prop("id")).toBe("TRID");
    });
  });
  it("all Td elements should recieve the right props", () => {
    expect(td.length).toBe(3);
    td.map((head, i) => {
      expect(head.prop("id")).toBe("TDID");
    });
  });
  it("should concat classnames recieved from table props and its own classnames", () => {
    th.map((element, i) => {
      expect(element.prop("className")).toContain("test-classname");
      expect(element.prop("className")).toContain("own-classname");
    });
    tr.map((element, i) => {
      expect(element.prop("className")).toContain("test-classname");
      expect(element.prop("className")).toContain("own-classname");
    });
    td.map((element, i) => {
      expect(element.prop("className")).toContain("test-classname");
      expect(element.prop("className")).toContain("own-classname");
    });
  });
});

describe("Table snapshot  tests", () => {
  it("should match snapshot", () => {
    expect(
      shallow(
        <Table
          ThProps={{
            id: "THID",
            className: "test-classname",
          }}
          TdProps={{
            id: "TDID",
            className: "test-classname",
          }}
          TrProps={{
            id: "TRID",
            className: "test-classname",
          }}
        >
          <THead>
            <Tr className="own-classname">
              <Th className="own-classname">column 1</Th>
              <Th className="own-classname">column 2</Th>
              <Th className="own-classname">column 3</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr className="own-classname">
              <Td className="own-classname">data 1</Td>
              <Td className="own-classname">data 2</Td>
              <Td className="own-classname">data 3</Td>
            </Tr>
          </TBody>
        </Table>
      )
    ).toMatchSnapshot;
  });
});
