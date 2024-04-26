import { QUERY_ROOT } from "../../constants/Query/query";

export function toImageLink(hash: string) {
  return `${QUERY_ROOT}api/avatars/${hash}.jpg`;
}
