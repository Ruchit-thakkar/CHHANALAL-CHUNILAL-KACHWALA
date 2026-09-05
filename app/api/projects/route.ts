import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { projectsData } from "@/data/projects";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get("category");

    await connectToDatabase();

    // Check count and auto-seed if empty
    const count = await Project.countDocuments();
    if (count === 0) {
      const seedItems = projectsData.map((item, index) => ({
        title: item.title,
        category: item.category,
        categorySlug: item.categorySlug,
        subtitle: item.subtitle,
        locationType: item.locationType,
        aspectRatio: item.aspectRatio || "aspect-[4/5]",
        image: item.image,
        specs: item.specs || [],
        description: item.description,
        order: index + 1,
      }));
      await Project.insertMany(seedItems);
    }

    const query: any = {};
    if (categoryFilter && categoryFilter !== "all") {
      query.categorySlug = categoryFilter;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

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

    // Only title, category, and description are required
    if (!title?.trim() || !category?.trim() || !description?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title, Category, and Description are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const computedSlug = categorySlug?.trim() || category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const project = await Project.create({
      title: title.trim(),
      category: category.trim(),
      categorySlug: computedSlug,
      description: description.trim(),
      image: image?.trim() || "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      subtitle: subtitle?.trim() || "",
      locationType: locationType?.trim() || "",
      aspectRatio: aspectRatio?.trim() || "aspect-[4/5]",
      specs: Array.isArray(specs) ? specs.filter((s: string) => typeof s === "string" && s.trim().length > 0) : [],
      order: typeof order === "number" ? order : 0,
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
