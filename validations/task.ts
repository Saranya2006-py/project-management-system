import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(2),

  description: z.string().min(5),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]),

  dueDate: z.string(),

  projectId: z.string(),
});