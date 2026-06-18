import { prisma } from "./prisma";

export async function logAction(
  action: string,
  userId: string
) {
  await prisma.auditLog.create({
    data: {
      action,
      userId,
    },
  });
}