import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = process.env.INNER_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });

      // Set httpOnly cookie for inner session
      response.cookies.set("inner_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Bad request" },
      { status: 400 }
    );
  }
}
