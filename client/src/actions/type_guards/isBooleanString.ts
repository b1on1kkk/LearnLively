export function isBooleanString(prop: string): prop is "true" | "false" {
  return prop === "true" || prop === "false";
}
