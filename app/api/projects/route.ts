import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { createProjectSchema } from "@/validations/project";
import { logAction } from "@/lib/audit";
export async function POST(
  req: Request
) {
  try {
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

    const body =
      await req.json();

    console.log(
      "BODY:",
      body
    );

    const parsed =
      createProjectSchema.safeParse(
        body
      );

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

    console.log(
      "PARSED:",
      parsed.data
    );

    console.log(
      "START DATE:",
      parsed.data.startDate
    );

    console.log(
      "END DATE:",
      parsed.data.endDate
    );

    const startDate =
      new Date(
        parsed.data.startDate
      );

    const endDate =
      new Date(
        parsed.data.endDate
      );

    console.log(
      "CONVERTED START:",
      startDate
    );

    console.log(
      "CONVERTED END:",
      endDate
    );

    const project =
      await prisma.project.create({
        data: {
          name:
            parsed.data.name,

          description:
            parsed.data.description,

          status:
            parsed.data.status,

          startDate,

          endDate,

          userId,
        },
      });

    await logAction(
      "Created Project",
      userId
    );

    return NextResponse.json(
      project,
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
    userId,

    ...(search && {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),

    ...(status && {
      status: status as any,
    }),
  };

  const total =
    await prisma.project.count({
      where,
    });

  const projects =
    await prisma.project.findMany({
      where,

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
    projects,
  });
}