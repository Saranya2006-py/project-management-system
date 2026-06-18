import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { createTaskSchema } from "@/validations/task";
import { logAction } from "@/lib/audit";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const task = await prisma.task.findFirst({
    where: {
      id,
      project: {
        is: {
          userId,
        },
      },
    },
  });

  if (!task) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(task);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

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

  const existing =
    await prisma.task.findFirst({
      where: {
        id,
        project: {
          is: {
            userId,
          },
        },
      },
    });

  if (!existing) {
    return NextResponse.json(
      {
        error: "Task not found",
      },
      {
        status: 404,
      }
    );
  }

  const task =
    await prisma.task.update({
      where: {
        id,
      },
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
      },
    });
    await logAction(
  "Updated Task",
  userId
);


  return NextResponse.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const task =
    await prisma.task.findFirst({
      where: {
        id,
        project: {
          is: {
            userId,
          },
        },
      },
    });

  if (!task) {
    return NextResponse.json(
      {
        error: "Task not found",
      },
      {
        status: 404,
      }
    );
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });
  await logAction(
  "Deleted Task",
  userId
);

  return NextResponse.json({
    message:
      "Task deleted successfully",
  });
}