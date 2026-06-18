import { z } from "zod";

export const createProjectSchema =
  z.object({
    name: z.string().min(2),

    description:
      z.string().min(5),

    status: z.enum([
      "NOT_STARTED",
      "IN_PROGRESS",
      "COMPLETED",
    ]),

    startDate:
      z.string(),

    endDate:
      z.string(),
  });