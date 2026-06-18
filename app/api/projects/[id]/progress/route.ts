import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

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

  const totalTasks =
    project.tasks.length;

  const completedTasks =
    project.tasks.filter(
      (task) =>
        task.status === "COMPLETED"
    ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  return NextResponse.json({
    projectName:
      project.name,
    totalTasks,
    completedTasks,
    progress,
  });
}