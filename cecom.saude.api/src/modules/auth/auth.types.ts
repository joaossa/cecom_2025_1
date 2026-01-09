export interface AppJwtPayload {
  sub: string;
  role: string;
  cdMaster: number;
  iat?: number;
  exp?: number;
}