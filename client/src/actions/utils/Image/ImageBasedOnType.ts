import { toImageLink } from "../Students/toImageLink";

export function ImageBasedOnType(
  status: "GOOGLE" | "OPEN_ID",
  img_link: string
) {
  console.log(status);

  if (status === "GOOGLE") {
    const new_link_size = img_link.replace(/=.*$/, "=s1024-c");
    return new_link_size;
  }

  return toImageLink(img_link);
}
