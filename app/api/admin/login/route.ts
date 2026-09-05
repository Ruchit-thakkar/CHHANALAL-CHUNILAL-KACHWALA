import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { adminId, password } = body;

    const EXPECTED_ADMIN_ID = process.env.ADMIN_ID || "cck";
    const EXPECTED_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cck123";

    if (!adminId || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both Admin ID and Password" },
        { status: 400 }
      );
    }

    if (adminId.trim() !== EXPECTED_ADMIN_ID || password !== EXPECTED_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid Admin ID or Password" },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = createSessionToken(adminId.trim());

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred" },
      { status: 500 }
    );
  }
}
