import { writeFile, mkdir } from "fs/promises";
import path, { join } from "path";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;

    if (!image || !name) {
      return NextResponse.json(
        { error: "Image or email not provided" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const projectRoot = process.cwd();
    const publicDir = path.join(projectRoot, "public");
    const dataDir = path.join(publicDir, "data");

    const picsDir = path.join(dataDir, "pics", `${[name]}`);

    await mkdir(picsDir, { recursive: true }); // Create the directory if it doesn't exist

    // Save the file in the email-specific directory
    const filename = image.name;
    const filepath = join(picsDir, filename);

    await writeFile(filepath, new Uint8Array(buffer));

    // Return success response with the file path
    return NextResponse.json({ success: true, filename, name });
  } catch (error) {
    console.error("Error saving image:", error);

    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }
}
