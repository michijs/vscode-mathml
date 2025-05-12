import type { IAttributeData, ITagData } from "vscode-html-languageservice";

export const attribute = (
  name: string,
  description: string,
  values?: string[] | string,
): IAttributeData => ({
  name,
  description,
  values: Array.isArray(values)
    ? values?.map((x) => ({
        name: x,
      }))
    : undefined,
  valueSet: !Array.isArray(values) ? values : undefined,
});
export const element = (
  name: string,
  description,
  attributes: IAttributeData[] = [],
): ITagData => ({
  name,
  description,
  attributes,
});
