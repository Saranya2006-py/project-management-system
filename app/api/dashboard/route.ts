import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const totalProjects =
      await prisma.project.count({
        where: {
          userId,
        },
      });

    const projectsInProgress =
      await prisma.project.count({
        where: {
          userId,
          status: "IN_PROGRESS",
        },
      });

    const totalTasks =
      await prisma.task.count({
        where: {
          project: {
            is: {
              userId,
            },
          },
        },
      });

    const completedTasks =
      await prisma.task.count({
        where: {
          status: "COMPLETED",
          project: {
            is: {
              userId,
            },
          },
        },
      });

    const pendingTasks =
      await prisma.task.count({
        where: {
          status: {
            in: [
              "PENDING",
              "IN_PROGRESS",
            ],
          },
          project: {
            is: {
              userId,
            },
          },
        },
      });

    const overdueTasks =
      await prisma.task.count({
        where: {
          status: {
            not: "COMPLETED",
          },
          dueDate: {
            lt: new Date(),
          },
          project: {
            is: {
              userId,
            },
          },
        },
      });

    return NextResponse.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      projectsInProgress,
      overdueTasks,
    });

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