// app/api/videos/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import * as ByteScale from "@bytescale/sdk";
import path from "path";
import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";

const uploadClient = new ByteScale.UploadManager({
    apiKey: process.env.BYTESCALE_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const video = formData.get("video") as string;
        const title = formData.get("title") as string;
        const duration = Math.floor(Number(formData.get("duration"))) as number;
        const is_free = formData.get("is_free") === "free" ? true : false;
        const session_id = formData.get("session_id") as string;

        // const { fileUrl } = await uploadClient.upload({
        //     data: video,
        //     path: {
        //         folderPath: "genius-academy/videos",
        //     },
        // });

        // ذخیره اطلاعات در دیتابیس
        const [data] = await sql`
      INSERT INTO videos (title, video_url, duration, is_free, session_id)
      VALUES (${title}, ${video}, ${duration}, ${is_free}, ${session_id})
      RETURNING *;
    `;
        revalidateTag("videos");

        return NextResponse.json({ success: true, message: "ویدیو با موفقیت آپلود شد", data });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "خطا در آپلود ویدیو" },
            { status: 500 }
        );
    }
}
