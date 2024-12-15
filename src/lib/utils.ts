import { camelCase } from "lodash";

export const toCamelCaseKeys = <T>(obj: Record<string, unknown>): T => {
  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = camelCase(key);
      if (camelKey === "reactions" && typeof obj[key] === "string") {
        try {
          newObj[camelKey] = JSON.parse(obj[key]);
        } catch (e) {
          console.error(`Failed to parse reactions for record ${obj.id}:`, e);
          newObj[camelKey] = [];
        }
      } else {
        newObj[camelKey] = obj[key];
      }
    }
  }
  return newObj as T;
};
