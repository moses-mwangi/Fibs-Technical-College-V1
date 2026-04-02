export const runtime = "nodejs";

import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import { users } from "./mockData";
import { User } from "@/types";

// const JWT_SECRET =
//   process.env.JWT_SECRET || "your-secret-key-change-in-production";

const JWT_SECRET = String("your-secret-key-change-in-production") as string;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  branchId: string | null;
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// export const generateToken = (user: AuthUser): string => {
//   console.log("Generating token for user:", user);
//   return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
// };

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: AuthUser): string => {
  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  console.log("Generated token:");
  const token = jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        console.error("Error generating token:", err);
      } else {
        console.log("Generated token:", token);
      }
    },
  );

  console.log("Generated token:", token);

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: AuthUser; token: string } | null> => {
  // For demo purposes, we're using mock users
  // In production, this would check against the database
  const user = users.find((u) => u.email === email);

  if (!user || !user.isActive) {
    return null;
  }

  // For demo, we're not actually verifying the password hash
  // In production, you would use verifyPassword
  // For now, accept the demo passwords
  const validPasswords = ["Admin123", "Lecturer123", "Accounts123"];
  if (!validPasswords.includes(password)) {
    return null;
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    branchId: user.branchId,
  };

  const token = generateToken(authUser);
  console.log(user, authUser, token);
  // console.log(user.email, "logged in successfully with role", user.role);

  return { user: authUser, token };
};

export const hasPermission = (
  userRole: string,
  requiredRole: string,
): boolean => {
  const roleLevel: Record<string, number> = {
    SUPER_ADMIN: 4,
    BRANCH_ADMIN: 3,
    ACCOUNTANT: 2,
    LECTURER: 1,
  };

  return roleLevel[userRole] >= roleLevel[requiredRole];
};
