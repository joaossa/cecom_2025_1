import { JwtPayload } from "jsonwebtoken";
import { AppJwtPayload } from "./auth.types";

export function isAppJwtPayload(
  payload: string | JwtPayload
): payload is JwtPayload & AppJwtPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof payload.sub === "string" &&
    typeof (payload as any).role === "string" &&
    typeof (payload as any).cdMaster === "number"
  );
}
