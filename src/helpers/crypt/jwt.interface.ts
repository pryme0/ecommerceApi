export interface JwtPayloadInterface {
  id?: string;
  email?: string;
  issuer?: string;
}

export interface JwtOptions {
  expiresIn?: string;
  algorithm?: string;
  audience?: string;
  subject?: string;
  issuer?: string;
  refreshIn?: string;
}
