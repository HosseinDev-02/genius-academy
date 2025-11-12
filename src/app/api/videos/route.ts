// app/api/videos/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { sql } from "@/src/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const video = formData.get("video") as File;
    const title = formData.get("title") as string;
    const duration = Math.floor(Number(formData.get("duration"))) as number;
    const is_free = formData.get("is_free") === "free" ? true : false;
    const session_id = formData.get("session_id") as string;
    

    // مسیر ذخیره در پروژه
    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${video.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/videos");
    const filePath = path.join(uploadDir, filename);

    // ذخیره فایل در public
    await writeFile(filePath, buffer);

    const videoUrl = `/uploads/videos/${filename}`;

    // ذخیره اطلاعات در دیتابیس
    const [data] = await sql`
      INSERT INTO videos (title, video_url, duration, is_free, session_id)
      VALUES (${title}, ${videoUrl}, ${duration}, ${is_free}, ${session_id})
      RETURNING *;
    `;

    return NextResponse.json({ message: "ویدیو با موفقیت آپلود شد", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "خطا در آپلود ویدیو" },
      { status: 500 }
    );
  }
}
