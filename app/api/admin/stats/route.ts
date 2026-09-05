import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();

    const [total, not_contacted, contacted, follow_up, completed, cancelled] =
      await Promise.all([
        Inquiry.countDocuments(),
        Inquiry.countDocuments({ status: "not_contacted" }),
        Inquiry.countDocuments({ status: "contacted" }),
        Inquiry.countDocuments({ status: "follow_up" }),
        Inquiry.countDocuments({ status: "completed" }),
        Inquiry.countDocuments({ status: "cancelled" }),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        total,
        not_contacted,
        contacted,
        follow_up,
        completed,
        cancelled,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Database error";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
