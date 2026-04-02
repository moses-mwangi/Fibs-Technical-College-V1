import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../models";
import ms from "ms";

const JWT_SECRET: string =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN: string | number =
  process.env.JWT_EXPIRES_IN || ms("24h") / 1000; // Default to 24 hours in seconds

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  branchId?: string;
}

// export interface SignOptionsExtended extends SignOptions {
//   expiresIn?: string | number;
// }

export const generateToken = (user: User): string => {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    branchId: user.branchId || undefined,
  };

  // const signOptions: SignOptions = { expiresIn: Number(JWT_EXPIRES_IN) };
  const signOptions: SignOptions = { expiresIn: ms("24h") };
  return jwt.sign(payload, JWT_SECRET, signOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const generateRefreshToken = (user: User): string => {
  const payload = {
    id: user.id,
    type: "refresh",
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};
