import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Inquiry, { InquiryStatus } from "@/lib/models/Inquiry";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single inquiry
export async function GET(req: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { inquiryId: id }] }
      : { inquiryId: id };

    const inquiry = await Inquiry.findOne(query).lean();
    if (!inquiry) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error fetching inquiry";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// PATCH update inquiry (status, adminNotes)
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, adminNotes } = body;

    await connectToDatabase();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { inquiryId: id }] }
      : { inquiryId: id };

    const existingInquiry = await Inquiry.findOne(query);
    if (!existingInquiry) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }

    const validStatuses: InquiryStatus[] = [
      "not_contacted",
      "contacted",
      "follow_up",
      "completed",
      "cancelled",
    ];

    if (status) {
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ success: false, error: "Invalid status value" }, { status: 400 });
      }

      // If status changed to contacted, set contactedAt timestamp
      if (status === "contacted" && existingInquiry.status !== "contacted") {
        existingInquiry.contactedAt = new Date();
      }

      existingInquiry.status = status;
    }

    if (adminNotes !== undefined) {
      existingInquiry.adminNotes = String(adminNotes);
    }

    await existingInquiry.save();

    return NextResponse.json({
      success: true,
      message: "Status updated successfully.",
      inquiry: existingInquiry,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error updating inquiry";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE inquiry
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { inquiryId: id }] }
      : { inquiryId: id };

    const deleted = await Inquiry.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error deleting inquiry";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
