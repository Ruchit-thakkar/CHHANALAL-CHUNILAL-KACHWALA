import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const {
      title,
      category,
      categorySlug,
      description,
      image,
      subtitle,
      locationType,
      aspectRatio,
      specs,
      order,
    } = body;

    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    if (title !== undefined) project.title = title.trim();
    if (category !== undefined) {
      project.category = category.trim();
      if (!categorySlug) {
        project.categorySlug = category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }
    }
    if (categorySlug !== undefined) project.categorySlug = categorySlug.trim();
    if (description !== undefined) project.description = description.trim();
    if (image !== undefined) project.image = image.trim();
    if (subtitle !== undefined) project.subtitle = subtitle.trim();
    if (locationType !== undefined) project.locationType = locationType.trim();
    if (aspectRatio !== undefined) project.aspectRatio = aspectRatio.trim();
    if (specs !== undefined && Array.isArray(specs)) {
      project.specs = specs.filter((s: string) => typeof s === "string" && s.trim().length > 0);
    }
    if (order !== undefined) project.order = order;

    await project.save();

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("PATCH /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
