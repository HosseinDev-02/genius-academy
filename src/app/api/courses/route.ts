import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { sql } from "@/src/db";
import { uploadImage } from "@/src/lib/utils/uploadImage";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const about = formData.get("about") as string;
        const price = parseFloat(formData.get("price") as string);
        const category_id = formData.get("category_id") as string;
        const image = formData.get("image") as File;
        const user_id = formData.get("user_id") as string;
        const short_name = formData.get("short_name") as string;
        const is_completed =
            formData.get("is_completed") === "isCompleted" ? true : false;
        const contentSrt = formData.get("content") as string;
        const content = JSON.parse(contentSrt);

        const fileUrl = await uploadImage(image, "genius-academy/images/courses");  // upload image in upload.io by imageUpload function

        await sql`
        INSERT INTO courses (title, category_id, price, image, user_id, short_name, is_completed, content, about)
        VALUES (${title}, ${category_id}, ${price}, ${fileUrl}, ${user_id}, ${short_name}, ${is_completed}, ${content}, ${about})
        `;

        return NextResponse.json({ success: true, fileUrl });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
