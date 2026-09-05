import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Inquiry, { InquiryStatus } from "@/lib/models/Inquiry";

// Public POST - Submit a new inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, projectDetails, preferredContact } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone Number is required" },
        { status: 400 }
      );
    }

    // Phone format validation
    const cleanedPhone = phone.trim();
    if (!/^[0-9+\s\-()]{7,16}$/.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string" || !service.trim()) {
      return NextResponse.json(
        { success: false, error: "Service Required is required" },
        { status: 400 }
      );
    }

    if (!projectDetails || typeof projectDetails !== "string" || !projectDetails.trim()) {
      return NextResponse.json(
        { success: false, error: "Project Details are required" },
        { status: 400 }
      );
    }

    const contactMethod =
      preferredContact === "WhatsApp" ? "WhatsApp" : "Phone Call";

    await connectToDatabase();

    const newInquiry = new Inquiry({
      name: name.trim(),
      phone: cleanedPhone,
      service: service.trim(),
      projectDetails: projectDetails.trim(),
      preferredContact: contactMethod,
      status: "not_contacted",
      adminNotes: "",
    });

    await newInquiry.save();

    return NextResponse.json(
      {
        success: true,
        inquiryId: newInquiry.inquiryId,
        message: "Inquiry received successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit inquiry";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// Protected GET - Retrieve inquiries for Admin Dashboard
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

    // Build query filter
    const query: Record<string, unknown> = {};

    if (status && status !== "all") {
      query.status = status as InquiryStatus;
    }

    if (search.trim()) {
      const escapedSearch = search.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const searchRegex = new RegExp(escapedSearch, "i");
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { inquiryId: searchRegex },
        { service: searchRegex },
      ];
    }

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Inquiry.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      inquiries,
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
