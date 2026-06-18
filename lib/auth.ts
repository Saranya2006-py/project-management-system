import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserId() {
  const cookieStore = await cookies();

  console.log("ALL COOKIES:", cookieStore.getAll());

  const token = cookieStore.get("token")?.value;

  console.log("TOKEN:", token);

  if (!token) {
    return null;
  }

  const payload = verifyToken(token) as {
    userId: string;
  } | null;

  console.log("PAYLOAD:", payload);

  if (!payload) {
    return null;
  }

  return payload.userId;
}