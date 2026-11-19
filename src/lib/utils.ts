export { cn } from "cn"

export function getCookieValue(cookie: string | undefined) {
  if (!cookie) return undefined;

  const [nameValue] = cookie.split(";");
  const separatorIndex = nameValue.indexOf("=");

  if (separatorIndex === -1) return undefined;

  return nameValue.slice(separatorIndex + 1);
}
