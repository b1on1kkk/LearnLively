// this function used for inner routing. for example message route is auth verified anyway, therefore there is no sence to check
// inner routes => user is logged in
export function identifyInnerRouting(path: string) {
  const splittedPath = path.split("/");

  if (splittedPath.length < 3) return path;

  return `/${splittedPath[1]}`;
}
