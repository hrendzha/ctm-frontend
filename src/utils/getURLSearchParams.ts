import { castObjValuesToString } from "./castObjValuesToString";

const getURLSearchParams = (data: Record<string, any>) => {
  const clone = structuredClone(data);

  // remove from object null, undefined or empty strings
  Object.keys(clone).forEach(key => {
    if (
      clone[key] === undefined ||
      clone[key] === null ||
      (typeof clone[key] === "string" && clone[key].length === 0)
    ) {
      delete clone[key];
    }
  });

  return castObjValuesToString(clone);
};

export { getURLSearchParams };
