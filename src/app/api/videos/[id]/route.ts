import { sql } from "@/src/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { unlink, writeFile } from "fs/promises";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        await sql`DELETE FROM videos WHERE id = ${id}`;
        return NextResponse.json(
            { message: "ویدیو با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        const data = await sql`SELECT * FROM videos WHERE id = ${id}`;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const video = formData.get("video") as File;
        const duration = Math.floor(Number(formData.get("duration"))) as number;
        const session_id = formData.get("session_id") as string;
        const is_free = formData.get("is_free") === "free" ? true : false;

        let video_url: string | null = null;

        if (video && video.size > 0) {
            // دریافت ویدیو فعلی برای حذف
            const [old] =
                await sql`SELECT video_url FROM videos WHERE id = ${id};`;

            if (old?.video_url) {
                const oldPath = path.join(
                    process.cwd(),
                    "public",
                    old.video_url.replace(/^\/+/, "")
                );
                try {
                    await unlink(oldPath);
                } catch (err) {
                    console.warn("حذف ویدیو قبلی انجام نشد:", err);
                }
            }

            // ذخیره ویدیو جدید
            const bytes = await video.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${video.name}`;
            const uploadDir = path.join(process.cwd(), "public/uploads/videos");
            const filePath = path.join(uploadDir, filename);

            await writeFile(filePath, buffer);
            video_url = `/uploads/videos/${filename}`;
        }

        console.log({ title, video_url, duration, is_free, session_id });

        // بروزرسانی دیتا در دیتابیس
        const [updated] = await sql`
            UPDATE videos
            SET 
              title = ${title},
              ${video_url ? sql`video_url = ${video_url},` : sql``}
              ${duration ? sql`duration = ${duration},` : sql``}
              is_free = ${is_free},
              session_id = ${session_id},
              updated_at = now()
            WHERE id = ${id}
            RETURNING *;
          `;

        return NextResponse.json({
            message: "ویدیو با موفقیت بروزرسانی شد",
            data: updated,
        });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
