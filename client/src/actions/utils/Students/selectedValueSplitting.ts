export function selectedValueSplitting(selectedKeys: Set<string>) {
  return Array.from(selectedKeys)
    .map((key) => key.replace(/_/g, "_"))
    .join(", ");
}
