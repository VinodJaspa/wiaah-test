import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ArrayElement } from "@nestjs/graphql";
import { GraphQLResolveInfo, FieldNode, SelectionNode } from "graphql";

export type GqlSelectedFields<
  T extends Record<string, any> = any,
  SelectField extends boolean = true
> = {
  [key in keyof T]: T[key] extends object
    ? T[key] extends Array<string | number | boolean>
      ? true
      : T[key] extends Date
      ? true
      : SelectField extends true
      ? { select: GqlSelectedFields<ArrayElement<T[key]>> }
      : GqlSelectedFields<ArrayElement<T[key]>, false>
    : true;
};

@Injectable()
export class GqlSelectedQueryPipe implements PipeTransform {
  constructor(
    private readonly rootMethodName?: string,
    private selectField: boolean = true
  ) {}
  transform(
    value: GraphQLResolveInfo,
    metadata: ArgumentMetadata
  ): GqlSelectedFields {
    const targetedRootField =
      value.fieldNodes.find((v) => v.name.value === this.rootMethodName) ||
      value.fieldNodes[0];

    return this.formatField(
      targetedRootField.selectionSet.selections as FieldNode[]
    );
  }

  private formatField(
    nodes: readonly FieldNode[]
  ): GqlSelectedFields<any, typeof this.selectField> {
    const fields: GqlSelectedFields<any, typeof this.selectField> = {};

    for (const node of nodes) {
      const subFields: readonly SelectionNode[] =
        node?.selectionSet?.selections;
      const hasSubFields = Array.isArray(subFields) && subFields.length > 0;

      const value = hasSubFields
        ? this.selectField
          ? { select: this.formatField(subFields || []) }
          : this.formatField(subFields || [])
        : true;

      fields[node.name.value] = value;
    }

    return fields;
  }
}
