import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/jwt";
import { loginSchema } from "@/validations/auth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    // Rate Limiting
    const ip =
      req.headers.get("x-forwarded-for") ||
      "unknown";

    const allowed =
      checkRateLimit(ip);
    console.log(
  "ALLOWED:",
  allowed
);

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Too many login attempts. Try again later.",
        },
        {
          status: 429,
        }
      );
    }

    const body =
      await req.json();

    const parsed =
      loginSchema.safeParse(body);

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

    const {
      email,
      password,
    } = parsed.data;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const isValid =
      await comparePassword(
        password,
        user.password
      );

    if (!isValid) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      generateToken(user.id);

    const response =
      NextResponse.json({
        message:
          "Login successful",

        user: {
          id: user.id,
          fullName:
            user.fullName,
          email:
            user.email,
        },
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        maxAge:
          60 * 60 * 24 * 7,
        path: "/",
      }
    );

    return response;
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