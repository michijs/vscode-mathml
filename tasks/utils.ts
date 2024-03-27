import type { IAttributeData } from "vscode-html-languageservice";

const mdnReference = (url?: string) =>
  url
    ? [
        {
          name: "MDN Reference",
          url,
        },
      ]
    : undefined;
export const attribute = (
  name: string,
  description: string,
  values?: string[],
) => ({
  name,
  description,
  values: values?.map((x) => ({
    name: x,
  })),
  references: mdnReference(
    "https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute",
  ),
});
export const element = (
  name: string,
  description,
  attributes: IAttributeData[] = [],
) => ({
  name,
  description,
  attributes,
  references: mdnReference(
    `https://developer.mozilla.org/en-US/docs/Web/MathML/Element/${name}`,
  ),
});
