import * as fs from "fs";
import { HTMLDataV1, IAttributeData } from "vscode-html-languageservice";
import { element, attribute } from "./utils";
import htmlData from "@vscode/web-custom-data/data/browsers.html-data.json";
const MathMLEvents = htmlData.globalAttributes.filter((x) =>
  x.name.startsWith("on"),
) as unknown as IAttributeData[];

const jsonData: HTMLDataV1 = {
  version: 1.1,
  tags: [
    element(
      "math",
      "The `<math>` MathML element is the top-level MathML element, used to write a single mathematical formula. It can be placed in HTML content where flow content is permitted.",
      [
        attribute(
          "display",
          "Specifies the rendering mode. The values `block` and `inline` are allowed.",
          ["block", "inline"],
        ),
        attribute("xmlns", "Specifies the URI for the MathML namespace.", [
          "http://www.w3.org/1998/Math/MathML",
        ]),
      ],
    ),
    element(
      "merror",
      "The `<merror>` MathML element is used to display contents as error messages. The intent of this element is to provide a standard way for programs that generate MathML from other input to report syntax errors.",
    ),
    element(
      "mfrac",
      "The `<mfrac>` MathML element is used to display fractions. It can also be used to mark up fraction-like objects such as binomial coefficients and Legendre symbols.",
      [
        attribute(
          "linethickness",
          "A `<length-percentage>` indicating the thickness of the horizontal fraction line.",
        ),
      ],
    ),
    element(
      "mi",
      "The `<mi>` MathML element indicates that the content should be rendered as an identifier such as function names, variables or symbolic constants. You can also have arbitrary text in it to mark up terms.",
    ),
    element(
      "mmultiscripts",
      "The `<mmultiscripts>` MathML element is used to attach an arbitrary number of subscripts and superscripts to an expression at once, generalizing the `<msubsup> element`. Scripts can be either prescripts (placed before the expression) or postscripts (placed after it).",
    ),
    element(
      "mn",
      'The `<mn>` MathML element represents a numeric literal which is normally a sequence of digits with a possible separator (a dot or a comma). However, it is also allowed to have arbitrary text in it which is actually a numeric quantity, for example "eleven".',
    ),
    element(
      "mo",
      'The `<mo>` MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.',
      [
        attribute(
          "fence",
          "A `<boolean>` indicating whether the operator is a fence (such as parentheses). There is no visual effect for this attribute.",
          ["false", "true"],
        ),
        attribute(
          "largeop",
          "A `<boolean>` indicating whether the operator should be drawn bigger when math-style is set to normal.",
          ["false", "true"],
        ),
        attribute(
          "lspace",
          "A `<length-percentage>` indicating the amount of space before the operator.",
        ),
        attribute(
          "maxsize",
          "A `<length-percentage>` indicating the maximum size of the operator when it is stretchy.",
        ),
        attribute(
          "minsize",
          "A `<length-percentage>` indicating the minimum size of the operator when it is stretchy.",
        ),
        attribute(
          "movablelimits",
          "A `<boolean>` indicating whether attached under- and overscripts move to sub- and superscript positions when math-style is set to compact.",
          ["false", "true"],
        ),
        attribute(
          "rspace",
          "A `<length-percentage>` indicating the amount of space after the operator.",
        ),
        attribute(
          "separator",
          "A `<boolean>` indicating whether the operator is a separator (such as commas). There is no visual effect for this attribute.",
          ["false", "true"],
        ),
        attribute(
          "stretchy",
          "A `<boolean>` indicating whether the operator stretches to the size of the adjacent element.",
          ["false", "true"],
        ),
        attribute(
          "symmetric",
          "A `<boolean>` indicating whether a stretchy operator should be vertically symmetric around the imaginary math axis (centered fraction line).",
          ["false", "true"],
        ),
      ],
    ),
    element(
      "mover",
      'The `<mover>` MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.',
      [
        attribute(
          "accent",
          "A `<boolean>` indicating whether the over script should be treated as an accent (i.e. drawn bigger and closer to the base expression).",
          ["false", "true"],
        ),
      ],
    ),
    element(
      "mpadded",
      "The `<mpadded>` MathML element is used to add extra padding and to set the general adjustment of position and size of enclosed contents.",
      [
        attribute(
          "depth",
          "A `<length-percentage>` indicating the desired depth (below the baseline) of the element.",
        ),
        attribute(
          "height",
          "A `<length-percentage>` indicating the desired height (above the baseline) of the element.",
        ),
        attribute(
          "lspace",
          "A `<length-percentage>` indicating the horizontal location of the positioning point of the child content with respect to the positioning point of the element.",
        ),
        attribute(
          "voffset",
          "A `<length-percentage>` indicating the vertical location of the positioning point of the child content with respect to the positioning point of the element.",
        ),
        attribute(
          "width",
          "A `<length-percentage>` indicating the desired depth (below the baseline) of the element.",
        ),
      ],
    ),
    element(
      "mphantom",
      "The `<mphantom>` MathML element is rendered invisibly, but dimensions (such as height, width, and baseline position) are still kept.",
    ),
    element(
      "mmultiscripts",
      "The `<mmultiscripts>` MathML element is used to attach an arbitrary number of subscripts and superscripts to an expression at once, generalizing the `<msubsup>` element. Scripts can be either prescripts (placed before the expression) or postscripts (placed after it).",
    ),
    element(
      "mroot",
      "The `<mroot>` MathML element is used to display roots with an explicit index.",
    ),
    element(
      "mrow",
      "The `<mrow>` MathML element is used to group sub-expressions, which usually contain one or more operators with their respective operands. This element renders as a horizontal row containing its arguments.",
    ),
    element(
      "ms",
      "The `<ms>` MathML element represents a string literal meant to be interpreted by programming languages and computer algebra systems.",
      [
        attribute("lquote", "The opening quote to enclose the content."),
        attribute("rquote", "The closing quote to enclose the content."),
      ],
    ),
    element(
      "semantics",
      "The `<semantics>` MathML element associates annotations with a MathML expression, for example its text source as a lightweight markup language or mathematical meaning expressed in a special XML dialect.",
      [
        attribute(
          "encoding",
          "The encoding of the semantic information in the annotation.",
        ),
      ],
    ),
    element(
      "mspace",
      "The `<mspace>` MathML element is used to display a blank space, whose size is set by its attributes.",
      [
        attribute(
          "depth",
          "A `<length-percentage>` indicating the desired depth (below the baseline) of the element.",
        ),
        attribute(
          "height",
          "A `<length-percentage>` indicating the desired height (above the baseline) of the element.",
        ),
        attribute(
          "width",
          "A `<length-percentage>` indicating the desired depth (below the baseline) of the element.",
        ),
      ],
    ),
    element(
      "msqrt",
      "The `<msqrt>` MathML element is used to display square roots (no index is displayed). The square root accepts only one argument, which leads to the following syntax: `<msqrt> base </msqrt>`.",
    ),
    element(
      "mstyle",
      "The `<mstyle>` MathML element is used to change the style of its children.",
    ),
    element(
      "msub",
      "The `<msub>` MathML element is used to attach a subscript to an expression.",
    ),
    element(
      "msubsup",
      "The `<msubsup>` MathML element is used to attach both a subscript and a superscript, together, to an expression. \n\nIt uses the following syntax: `<msubsup> base subscript superscript </msubsup>`.",
    ),
    element(
      "mtable",
      "The `<mtable>` MathML element allows you to create tables or matrices. Its children are `<mtr>` elements (representing rows), each of them having `<mtd>` elements as its children (representing cells). These elements are similar to `<table>`, `<tr>` and `<td>` elements of HTML.",
    ),
    element(
      "mtd",
      "The `<mtd>` MathML element represents a cell in a table or a matrix. It may only appear in a `<mtr>` element. This element is similar to the `<td>` element of HTML.",
      [
        attribute(
          "columnspan",
          "A non-negative integer value that indicates on how many columns does the cell extend.",
        ),
        attribute(
          "rowspan",
          "A non-negative integer value that indicates on how many rows does the cell extend.",
        ),
      ],
    ),
    element(
      "mtext",
      "The `<mtext>` MathML element is used to render arbitrary text with no notational meaning, such as comments or annotations. \nTo display text with notational meaning, use `<mi>`, `<mn>`, `<mo>` or `<ms>` instead.",
    ),
    element(
      "mtr",
      "The `<mtr>` MathML element represents a row in a table or a matrix. It may only appear in a `<mtable>` element and its children are `<mtd>` elements representing cells. This element is similar to the `<tr>` element of HTML.",
    ),
    element(
      "munder",
      "The `<munder>` MathML element is used to attach an accent or a limit under an expression. It uses the following syntax: `<munder> base underscript </munder>`",
      [
        attribute(
          "accentunder",
          "A `<boolean>` indicating whether the under script should be treated as an accent (i.e. drawn bigger and closer to the base expression).",
          ["false", "true"],
        ),
      ],
    ),
    element(
      "munderover",
      "The `<munderover>` MathML element is used to attach accents or limits both under and over an expression.",
      [
        attribute(
          "accent",
          "A `<boolean>` indicating whether the over script should be treated as an accent (i.e. drawn bigger and closer to the base expression).",
          ["false", "true"],
        ),
        attribute(
          "accentunder",
          "A `<boolean>` indicating whether the under script should be treated as an accent (i.e. drawn bigger and closer to the base expression).",
          ["false", "true"],
        ),
      ],
    ),
  ],
  globalAttributes: [
    attribute(
      "dir",
      "The text direction. Possible values are either `ltr` (left to right) or `rtl` (right to left).",
      ["ltr", "rtl"],
    ),
    attribute(
      "displaystyle",
      "A `<boolean>` specifying whether to set the math-style to `normal` (if true) or `compact` (otherwise).",
      ["true", "false"],
    ),
    attribute("href", "Used to set a hyperlink to a specified URI."),
    attribute("id", "Sets up a unique identifier associated with the element."),
    attribute(
      "mathvariant",
      "The logical class of token elements, which varies in typography.",
    ),
    attribute(
      "scriptlevel",
      "Specifies a math-depth for the element. See the scriptlevel page for accepted values and mapping.",
    ),
    ...MathMLEvents,
  ],
};

fs.writeFileSync(
  "./dist/mathml.json",
  JSON.stringify(jsonData, null, 2),
  "utf-8",
);
