import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Estimation, { EstimationStatus } from "@/lib/models/Estimation";

// Public POST - Submit a new Direct Estimation / Custom Quote
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, projectType, dimensionsNotes } = body;

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const cleanedPhone = phone.trim();
    if (!/^[0-9+\s\-()]{7,18}$/.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newEstimation = new Estimation({
      name: (name && typeof name === "string" && name.trim()) ? name.trim() : "Valued Client",
      phone: cleanedPhone,
      service: (service && typeof service === "string" && service.trim()) ? service.trim() : "Glass Railing",
      projectType: (projectType && typeof projectType === "string" && projectType.trim()) ? projectType.trim() : "Residential",
      dimensionsNotes: (dimensionsNotes && typeof dimensionsNotes === "string") ? dimensionsNotes.trim() : "",
      status: "not_contacted",
      adminNotes: "",
    });

    await newEstimation.save();

    return NextResponse.json(
      {
        success: true,
        estimationId: newEstimation.estimationId,
        message: "Direct estimation request received successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit direct estimation";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// Protected GET - Retrieve estimations for Admin Dashboard
export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const sortOrder = searchParams.get("sort") === "oldest" ? 1 : -1;
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "50", 10)));
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (status && status !== "all") {
      query.status = status as EstimationStatus;
    }

    if (search.trim()) {
      const escapedSearch = search.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const searchRegex = new RegExp(escapedSearch, "i");
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { estimationId: searchRegex },
        { service: searchRegex },
        { projectType: searchRegex },
      ];
    }

    const [estimations, total] = await Promise.all([
      Estimation.find(query)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Estimation.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      estimations,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database query failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
