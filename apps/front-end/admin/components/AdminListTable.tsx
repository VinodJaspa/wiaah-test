import {
  usePaginationControlsOptions,
  Avatar,
  Button,
  Checkbox,
  Image,
  Input,
  ListIcon,
  Pagination,
  PlusIcon,
  Table,
  TableContainer,
  TableProps,
  TBody,
  Td,
  Th,
  THead,
  ThProps,
  Tr,
  TrashIcon,
} from "ui";
import React from "react";
import { mapArray, runIfFn } from "utils";

export enum AdminTableCellTypeEnum {
  checkbox = "checkbox",
  text = "text",
  number = "number",
  action = "action",
  image = "image",
  avatar = "avatar",
  custom = "custom",
}

export const AdminListTable: React.FC<{
  title: string;
  pagination?: usePaginationControlsOptions;
  props?: TableProps;
  onAdd?: (ids: string[]) => any;
  onDelete?: (ids: string[]) => any;
  headers: {
    props?: ThProps;
    value?: string;
    type?: AdminTableCellTypeEnum;
    actionBtns?: React.ReactNode[];
    custom?: React.ReactNode;
  }[];
  data: {
    id: string;
    cols: {
      props?: ThProps;
      value?: string;
      type?: AdminTableCellTypeEnum;
      actionBtns?: React.ReactNode[];
      custom?: React.ReactNode;
    }[];
  }[];
  contain?: boolean;
}> = ({
  data,
  headers,
  onAdd,
  onDelete,
  title,
  props,
  pagination,
  contain,
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <section>
      <div className="flex gap-1 py-4 justify-end">
        {onAdd ? (
          <Button
            onClick={() => onAdd && onAdd(selected)}
            center
            className="w-8 h-8"
          >
            <PlusIcon />
          </Button>
        ) : null}
        {onDelete ? (
          <Button
            onClick={() => onDelete && onDelete(selected)}
            center
            className="w-8 h-8"
            colorScheme="danger"
          >
            <TrashIcon />
          </Button>
        ) : null}
      </div>
      <div className="border border-gray-300">
        {title ? (
          <div className="flex border-b border-gray-300 items-center gap-2 p-4">
            <ListIcon />
            <p>{title}</p>
          </div>
        ) : null}
        <div className="p-4">
          <TableContainer>
            <Table
              ThProps={{ align: "left" }}
              TdProps={{ className: "max-w-[20rem]" }}
              className={`${contain ? "min-w-max" : "w-full"}`}
              {...props}
            >
              <THead>
                <Tr>
                  {mapArray(headers, ({ props, type, value }) => {
                    switch (type) {
                      case AdminTableCellTypeEnum.checkbox:
                        return (
                          <Th className={`${props?.className || ""} w-fit`}>
                            <Checkbox
                              onChange={(e) =>
                                e.target.checked
                                  ? setSelected(data.map((v) => v.id))
                                  : setSelected([])
                              }
                            />
                          </Th>
                        );
                      default:
                        return <Th {...props}>{value}</Th>;
                    }
                  })}
                </Tr>
                <Tr>
                  {mapArray(headers, ({ custom, props, type }) => {
                    switch (type) {
                      case AdminTableCellTypeEnum.text:
                        return (
                          <Th {...props}>
                            <Input />
                          </Th>
                        );
                      case AdminTableCellTypeEnum.number:
                        return (
                          <Th {...props}>
                            <Input type="number" />
                          </Th>
                        );

                      case AdminTableCellTypeEnum.custom:
                        return <Td {...props}>{runIfFn(custom)}</Td>;
                      default:
                        return <Th {...props} />;
                    }
                  })}
                </Tr>
              </THead>
              <TBody>
                {mapArray(data, ({ cols, id }) => (
                  <Tr key={id}>
                    {mapArray(
                      cols,
                      ({ custom, actionBtns, props, type, value }) => {
                        switch (type) {
                          case AdminTableCellTypeEnum.image:
                            return (
                              <Td {...props}>
                                <Image src={value} />
                              </Td>
                            );
                          case AdminTableCellTypeEnum.avatar:
                            return (
                              <Td {...props}>
                                <Avatar src={value} />
                              </Td>
                            );
                          case AdminTableCellTypeEnum.checkbox:
                            return (
                              <Td {...props}>
                                <Checkbox
                                  onChange={(e) =>
                                    setSelected((v) =>
                                      e.target.checked
                                        ? [...v.filter((v) => v !== id), id]
                                        : v.filter((v) => v !== id)
                                    )
                                  }
                                />
                              </Td>
                            );
                          case AdminTableCellTypeEnum.number:
                            return <Td {...props}>{value}</Td>;

                          case AdminTableCellTypeEnum.action:
                            return (
                              <Td {...props}>
                                <div className="flex w-fit flex-wrap gap-2">
                                  {mapArray(actionBtns, (btn) => runIfFn(btn))}
                                </div>
                              </Td>
                            );
                          case AdminTableCellTypeEnum.custom:
                            return <Td {...props}>{runIfFn(custom)}</Td>;
                          default:
                            return <Td {...props}>{value}</Td>;
                        }
                      }
                    )}
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableContainer>
          {pagination ? <Pagination /> : null}
        </div>
      </div>
    </section>
  );
};
