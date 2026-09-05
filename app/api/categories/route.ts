import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { isAuthenticatedAdmin } from "@/lib/auth";

const DEFAULT_CATEGORIES = [
  { name: "Glass Railing", slug: "railing", description: "Frameless, spigot, bracket glass railings", order: 1 },
  { name: "Aluminium Work", slug: "aluminium", description: "Slim partitions, sliding systems, facades", order: 2 },
  { name: "Designer Mirrors", slug: "mirror", description: "LED backlight, fluted accents, vanity mirrors", order: 3 },
  { name: "Custom Glass", slug: "glass", description: "Fluted, frosted, tinted and architectural glass", order: 4 },
];

export async function GET() {
  try {
    await connectToDatabase();

    // Check count and auto-seed if empty
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(DEFAULT_CATEGORIES);
    }

    const categories = await Category.find({}).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, slug, description, order } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const computedSlug = slug && slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await connectToDatabase();

    const existing = await Category.findOne({ slug: computedSlug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Category slug or name already exists" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: name.trim(),
      slug: computedSlug,
      description: description?.trim() || "",
      order: typeof order === "number" ? order : 0,
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
