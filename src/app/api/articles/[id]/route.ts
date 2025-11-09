import { sql } from "@/src/db";
import { unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

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
        const response = await sql`DELETE FROM articles WHERE id = ${id}`;
        return NextResponse.json(
            { message: "مقاله با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const data = await sql`SELECT * FROM articles WHERE id = ${id}`;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const formData = await req.formData();
        console.log('article Id :', id)

        const title = formData.get("title") as string;
        const about = formData.get("about") as string;
        const time_read = parseInt(formData.get("time_read") as string);
        const category_id = formData.get("category_id") as string;
        const image = formData.get("image") as File | null;
        const user_id = formData.get("user_id") as string;
        const short_name = formData.get("short_name") as string;
        const contentStr = formData.get("content") as string;
        const content = JSON.parse(contentStr);

        let imageUrl: string | null = null;

        // اگر فایل جدیدی آپلود شده:
        if (image && typeof image === "object" && "arrayBuffer" in image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${image.name}`;
            const filePath = path.join(
                process.cwd(),
                "public/uploads",
                fileName
            );
            await writeFile(filePath, buffer);

            imageUrl = `/uploads/${fileName}`;

            // حذف تصویر قبلی از سرور (اختیاری)
            const oldImage =
                await sql`SELECT image FROM articles WHERE id = ${id}`;
            const oldPath = oldImage[0]?.image;
            if (oldPath) {
                const oldFile = path.join(process.cwd(), "public", oldPath);
                try {
                    await unlink(oldFile);
                } catch {
                    console.warn("Old image not found or already deleted");
                }
            }
        }

        // اگر تصویر جدیدی نیست، مقدار قبلی حفظ شود
        if (!imageUrl) {
            const oldImage =
                await sql`SELECT image FROM articles WHERE id = ${id}`;
            imageUrl = oldImage[0]?.image || null;
        }

        // آپدیت در دیتابیس
        await sql`
        UPDATE articles
        SET 
          title = ${title},
          about = ${about},
          time_read = ${time_read},
          category_id = ${category_id},
          image = ${imageUrl},
          user_id = ${user_id},
          short_name = ${short_name},
          content = ${content}
        WHERE id = ${id}
      `;
        return NextResponse.json(
            { success: true, imageUrl },
        );
    } catch (error) {
        console.error("Update failed:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
