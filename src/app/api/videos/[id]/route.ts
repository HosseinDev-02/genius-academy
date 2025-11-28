import { sql } from "@/src/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { unlink, writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";

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
        revalidateTag("videos");
        return NextResponse.json(
            { success: true, message: "ویدیو با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام حذف ویدیو خطایی رخ داد" },
            { status: 500 }
        );
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
        const video = formData.get("video") as string;
        const duration = Math.floor(Number(formData.get("duration"))) as number;
        const session_id = formData.get("session_id") as string;
        const is_free = formData.get("is_free") === "free" ? true : false;

        let videoUrl: string | null = null;

        if (!video) {
            // دریافت ویدیو فعلی برای حذف
            const [old] =
                await sql`SELECT video_url FROM videos WHERE id = ${id};`;

            videoUrl = old.video_url;
        }else {
            videoUrl = video
        }

        // بروزرسانی دیتا در دیتابیس
        const [updated] = await sql`
            UPDATE videos
            SET 
              title = ${title},
              ${videoUrl ? sql`video_url = ${videoUrl},` : sql``}
              ${duration ? sql`duration = ${duration},` : sql``}
              is_free = ${is_free},
              session_id = ${session_id},
              updated_at = now()
            WHERE id = ${id}
            RETURNING *;
          `;

        revalidateTag("videos");

        return NextResponse.json({
            success: true,
            message: "ویدیو با موفقیت بروزرسانی شد",
            data: updated,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "خطا در بروزرسانی ویدیو" },
            { status: 500 }
        );
    }
}
