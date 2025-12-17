import { sql } from "@/src/db";
import { uploadImage } from "@/src/lib/utils/uploadImage";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const category_id = formData.get("category_id") as string;
        const user_id = formData.get("user_id") as string;
        const short_name = formData.get("short_name") as string;
        const time_read = formData.get("time_read") as string;
        const about = formData.get("about") as string;
        const image = formData.get("image") as string;

        const imageUrl = image

        await sql`
            INSERT INTO articles (title, content, category_id, user_id, short_name, time_read, about, image)
            VALUES (${title}, ${content}, ${category_id}, ${user_id}, ${short_name}, ${time_read}, ${about}, ${imageUrl})
        `;
        revalidateTag("articles");
        return NextResponse.json(
            { success: true, message: "مقاله با موفقیت افزوده شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام افزودن مقاله خطایی رخ داد" },
            { status: 500 }
        );
    }
}
