export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateToken, verifyPassword } from "@/lib/auth";
import { users } from "@/lib/mockData";

export async function POST(req: Request) {
  console.log("Received login request");
  const body = await req.json();
  const { email, password } = body;
  console.log("Received login request for email:::", email);

  const user = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  console.log("User found:::", user, valid);

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = generateToken(user);

  return NextResponse.json({
    token,
    user,
  });
}
