import { toImageLink } from "../Students/toImageLink";

export function ImageBasedOnType(
  status: "GOOGLE" | "OPEN_ID",
  img_link: string
) {
  if (status === "GOOGLE") return img_link.replace(/=.*$/, "=s1024-c");

  return toImageLink(img_link);
}
