"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppJwtPayload = isAppJwtPayload;
function isAppJwtPayload(payload) {
    return (typeof payload === "object" &&
        payload !== null &&
        typeof payload.sub === "string" &&
        typeof payload.role === "string" &&
        typeof payload.cdMaster === "number");
}
//# sourceMappingURL=auth.guard.js.map