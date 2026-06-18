import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { createTaskSchema } from "@/validations/task";
import { logAction } from "@/lib/audit";
export async function POST(req: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed =
      createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const project =
      await prisma.project.findFirst({
        where: {
          id: parsed.data.projectId,
          userId,
        },
      });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    const task =
      await prisma.task.create({
        data: {
          name: parsed.data.name,
          description:
            parsed.data.description,
          priority:
            parsed.data.priority,
          status:
            parsed.data.status,
          dueDate: new Date(
            parsed.data.dueDate
          ),
          projectId:
            parsed.data.projectId,
        },
      });
      await logAction(
  "Created Task",
  userId
);

    return NextResponse.json(
      task,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  req: Request
) {
  const userId =
    await getUserId();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { searchParams } =
    new URL(req.url);

  const search =
    searchParams.get("search");

  const status =
    searchParams.get("status");

  const priority =
    searchParams.get("priority");

  const page = Number(
    searchParams.get("page")
  ) || 1;

  const limit = Number(
    searchParams.get("limit")
  ) || 5;

  const sort =
    searchParams.get("sort") ||
    "createdAt";

  const skip =
    (page - 1) * limit;

  const where = {
    project: {
      is: {
        userId,
      },
    },

    ...(search && {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),

    ...(status && {
      status: status as any,
    }),

    ...(priority && {
      priority: priority as any,
    }),
  };

  const total =
    await prisma.task.count({
      where,
    });

  const tasks =
    await prisma.task.findMany({
      where,

      include: {
        project: true,
      },

      skip,

      take: limit,

      orderBy: {
        [sort]: "desc",
      },
    });

  return NextResponse.json({
    total,
    page,
    limit,
    tasks,
  });
}