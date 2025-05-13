import bcd, {
  type CompatStatement,
  type Identifier,
  type SupportBlock,
  type SupportStatement,
} from "@mdn/browser-compat-data";
// @ts-ignore
import { getStatus } from "compute-baseline";
import type { IAttributeData, ITagData } from "vscode-html-languageservice";

const namespace = "mathml";
export const featureBcd = bcd[namespace];
export const bcdElements = featureBcd.elements;
const baseMDN = `https://developer.mozilla.org/en-US/docs/Web/MathML`;
const elementsMDN = `${baseMDN}/Element`;
const attributesMDN = `${baseMDN}/Attribute`;

function getFeatureId(compat?: CompatStatement) {
  return compat?.tags
    ?.find((tag) => {
      const parts = tag.split(":");
      return parts.length == 2 && parts[0] == "web-features";
    })
    ?.split(":")[1];
}

const BaselineBrowserAbbreviations = {
  chrome: "C",
  chrome_android: "CA",
  edge: "E",
  firefox: "FF",
  firefox_android: "FFA",
  safari: "S",
  safari_ios: "SM",
};

function getBrowserCompatString(support: SupportBlock) {
  if (!support) {
    return;
  }
  return Object.entries(support).map(([browser, version_added]) => {
    const abbreviation = BaselineBrowserAbbreviations[browser];
    return supportToShortCompatString({ version_added }, abbreviation);
  });
}

function supportToShortCompatString(
  support: { version_added: SupportStatement },
  browserAbbrev: string,
): string {
  let version_added;
  if (Array.isArray(support) && support[0] && support[0].version_added) {
    version_added = support[0].version_added;
  } else if (support.version_added) {
    version_added = support.version_added;
  }

  if (version_added) {
    if (typeof version_added === "boolean") {
      return browserAbbrev;
    } else {
      return `${browserAbbrev}${version_added}`;
    }
  }

  return "";
}

const mdnReference = (url?: string) =>
  url
    ? [
        {
          name: "MDN Reference",
          url,
        },
      ]
    : undefined;

export const addCompatDataAttrs = (
  attributes: IAttributeData[],
  featureId?: string,
  t?: ITagData,
) => {
  // Add the Baseline status to each attribute
  attributes.forEach((a) => {
    let attributeNamespace, bcdMatchingAttr;
    if (t) {
      attributeNamespace = `elements.${t.name}`;
      bcdMatchingAttr = bcdElements[t.name][a.name];
    }
    if (!bcdMatchingAttr) {
      attributeNamespace = "global_attributes";
      bcdMatchingAttr =
        featureBcd.global_attributes[a.name] ??
        bcd.html.global_attributes[a.name];
    }
    a.references =
      a.references ??
      mdnReference(
        bcdMatchingAttr?.__compat?.mdn_url ?? `${attributesMDN}/${a.name}`,
      );

    if (!bcdMatchingAttr) return;
    const attrFeatureId = getFeatureId(bcdMatchingAttr.__compat) ?? featureId;
    if (!attrFeatureId) return;
    const attrStatus = getStatus(
      attrFeatureId,
      `${namespace}.${attributeNamespace}.${a.name}`,
    );
    if (!attrStatus) {
      return;
    }
    a.browsers = getBrowserCompatString(attrStatus.support);

    const { support, ...status } = attrStatus;
    a.status = status;
  });
};

export const addCompatData = (t: ITagData) => {
  if (t.description) {
    t.description = {
      kind: "markdown",
      value: t.description as string,
    };
  }

  const bcdMatchingTag = bcdElements[t.name];
  t.references = mdnReference(
    bcdMatchingTag.__compat?.mdn_url ?? `${elementsMDN}/${t.name}`,
  );

  // Add the Baseline status to the HTML element
  const featureId = getFeatureId(bcdMatchingTag.__compat);
  if (!featureId) {
    return;
  }
  const status = getStatus(featureId, `${namespace}.elements.${t.name}`);
  if (!status) {
    return;
  }
  t.browsers = getBrowserCompatString(status.support) as string[] | undefined;
  // @ts-ignore
  delete status.support;
  t.status = status;

  addCompatDataAttrs(t.attributes, featureId, t);
  lookForMissingAttributes(t);
  // TODO: For some reason some attributes are not there
  lookForDeprecatedAttributes(t);
};

export const lookForMissingTags = (tags: ITagData[]) => {
  const missingElements = Object.entries(bcdElements)
    .filter(
      ([x, element]) =>
        !(element as Identifier).__compat?.status?.deprecated &&
        !(element as Identifier).__compat?.status?.experimental &&
        (element as Identifier).__compat?.status?.standard_track &&
        !tags.find((y) => y.name === x),
    )
    .map(([x]) => x);
  if (missingElements.length > 0)
    console.log(`Missing elements ${JSON.stringify(missingElements)}`);
};

export const lookForDeprecatedTags = (tags: ITagData[]) => {
  const deprecatedElements = tags
    .filter((x) => {
      const elementFound = bcdElements[x.name];
      return !elementFound || elementFound.__compat?.status?.deprecated;
    })
    .map((x) => x.name);

  if (deprecatedElements.length > 0)
    console.log(
      `Remove the following elements ${JSON.stringify(deprecatedElements)}`,
    );
};

export const lookForMissingAttributes = (t: ITagData) => {
  const missingAttrs = Object.entries(bcdElements[t.name])
    .filter(([x, attribute]) => {
      return (
        x !== "__compat" &&
        !(attribute as Identifier).__compat?.status?.deprecated &&
        !(attribute as Identifier).__compat?.status?.experimental &&
        (attribute as Identifier).__compat?.status?.standard_track &&
        !t.attributes.find((y) => y.name === x)
      );
    })
    .map(([x]) => x);
  if (missingAttrs.length > 0) {
    console.log(`${t.name} Missing attributes ${JSON.stringify(missingAttrs)}`);
  }
};

export const lookForDeprecatedAttributes = (t: ITagData) => {
  const deprecatedAttrs = t.attributes
    .filter((x) => {
      const attributeFound = bcdElements[t.name][x.name];
      return (
        !attributeFound || attributeFound.__compat?.status?.deprecated === true
      );
    })
    .map((x) => x.name);

  if (deprecatedAttrs.length > 0)
    console.log(
      `${t.name} Remove the following attributes ${JSON.stringify(deprecatedAttrs)}`,
    );
};
