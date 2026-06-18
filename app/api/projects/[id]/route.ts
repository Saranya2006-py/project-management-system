import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
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

  const project =
    await prisma.project.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        tasks: true,
      },
    });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}
import { createProjectSchema } from "@/validations/project";

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
    createProjectSchema.safeParse(body);

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
    await prisma.project.findFirst({
      where: {
        id,
        userId,
      },
    });

  if (!existing) {
    return NextResponse.json(
      {
        error: "Project not found",
      },
      {
        status: 404,
      }
    );
  }

  const updated =
    await prisma.project.update({
      where: {
        id,
      },

      data: {
        ...parsed.data,

        startDate:
          new Date(
            parsed.data.startDate
          ),

        endDate:
          new Date(
            parsed.data.endDate
          ),
      },
    });

  await logAction(
    "Updated Project",
    userId
  );

  return NextResponse.json(updated);
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

  const project =
    await prisma.project.findFirst({
      where: {
        id,
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

  await prisma.project.delete({
    where: {
      id,
    },
  });

  await logAction(
    "Deleted Project",
    userId
  );

  return NextResponse.json({
    message:
      "Project deleted successfully",
  });
}