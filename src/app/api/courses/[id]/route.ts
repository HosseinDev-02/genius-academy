import { sql } from "@/src/db";
import { NextResponse } from "next/server";
import { uploadImage } from "@/src/utils";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params; // ✅ await لازم است
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }

        // اجرای Query حذف
        const result = await sql`DELETE FROM courses WHERE id = ${id}`;

        // چون delete چیزی برنمی‌گردونه، فقط پیام موفقیت
        return NextResponse.json(
            { message: "دوره با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "خطایی در حذف دوره رخ داد" },
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
        const result = await sql`SELECT * FROM courses WHERE id = ${id}`;

        // اگر چیزی پیدا نشد
        if (result.length === 0) {
            return NextResponse.json(
                { message: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result[0], { status: 200 });
    } catch (error) {
        console.error(error);
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

        const title = formData.get("title") as string;
        const about = formData.get("about") as string;
        const price = parseFloat(formData.get("price") as string);
        const category_id = formData.get("category_id") as string;
        const image = formData.get("image") as File | null;
        const user_id = formData.get("user_id") as string;
        const short_name = formData.get("short_name") as string;
        const is_completed =
            formData.get("is_completed") === "isCompleted" ? true : false;
        const contentStr = formData.get("content") as string;
        const content = JSON.parse(contentStr);

        let imageUrl: string | null = null;

        // اگر فایل جدیدی آپلود شده:
        if (image && typeof image === "object" && "arrayBuffer" in image) {
            imageUrl = await uploadImage(
                image,
                "genius-academy/images/courses"
            );
        }

        // اگر تصویر جدیدی نیست، مقدار قبلی حفظ شود
        if (!imageUrl) {
            const oldImage =
                await sql`SELECT image FROM courses WHERE id = ${id}`;
            imageUrl = oldImage[0]?.image || null;
        }

        // آپدیت در دیتابیس
        await sql`
        UPDATE courses
        SET 
          title = ${title},
          about = ${about},
          price = ${price},
          category_id = ${category_id},
          image = ${imageUrl},
          user_id = ${user_id},
          short_name = ${short_name},
          is_completed = ${is_completed},
          content = ${content}
        WHERE id = ${id}
      `;

        return NextResponse.json({ success: true, imageUrl });
    } catch (error) {
        console.error("Update failed:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
