import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Estimation, { EstimationStatus } from "@/lib/models/Estimation";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single estimation
export async function GET(req: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { estimationId: id }] }
      : { estimationId: id };

    const estimation = await Estimation.findOne(query).lean();
    if (!estimation) {
      return NextResponse.json({ success: false, error: "Estimation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, estimation });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error fetching estimation";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// PATCH update estimation (status, adminNotes)
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
      ? { $or: [{ _id: id }, { estimationId: id }] }
      : { estimationId: id };

    const existingEstimation = await Estimation.findOne(query);
    if (!existingEstimation) {
      return NextResponse.json({ success: false, error: "Estimation not found" }, { status: 404 });
    }

    const validStatuses: EstimationStatus[] = [
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

      if (status === "contacted" && existingEstimation.status !== "contacted") {
        existingEstimation.contactedAt = new Date();
      }

      existingEstimation.status = status;
    }

    if (adminNotes !== undefined) {
      existingEstimation.adminNotes = String(adminNotes);
    }

    await existingEstimation.save();

    return NextResponse.json({
      success: true,
      message: "Estimation updated successfully",
      estimation: existingEstimation,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error updating estimation";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE estimation
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { estimationId: id }] }
      : { estimationId: id };

    const deleted = await Estimation.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Estimation not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Estimation deleted successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error deleting estimation";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
