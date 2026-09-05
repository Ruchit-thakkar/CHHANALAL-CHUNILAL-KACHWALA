import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "private_UPtWC3YPQL+vy1ZtiFvM6tdo4aE=";
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/d8lvpyarr";

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString("base64");

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Upload to ImageKit REST API
    const uploadPayload = new FormData();
    uploadPayload.append("file", `data:${file.type || "image/jpeg"};base64,${base64File}`);
    uploadPayload.append("fileName", `${Date.now()}_${cleanFileName}`);
    uploadPayload.append("useUniqueFileName", "true");
    uploadPayload.append("folder", "/cck_projects");

    const authHeader = `Basic ${Buffer.from(privateKey + ":").toString("base64")}`;

    const ikResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: uploadPayload,
    });

    const ikData = await ikResponse.json();

    if (!ikResponse.ok) {
      return NextResponse.json(
        { success: false, error: ikData.message || "Failed to upload image to ImageKit" },
        { status: ikResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      url: ikData.url || `${urlEndpoint}/${ikData.name}`,
      fileId: ikData.fileId,
      name: ikData.name,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Image upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
