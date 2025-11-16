import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { sql } from "@/src/db";
import * as ByteScale from "@bytescale/sdk";

const uploadClient = new ByteScale.UploadManager({
    apiKey: process.env.BYTESCALE_API_KEY!,
});

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

        // ذخیره فایل در پوشه public/uploads
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // const fileName = `${Date.now()}-${image.name}`;
        // const filePath = path.join(process.cwd(), "public/uploads", fileName);
        // await writeFile(filePath, buffer);

        // const imageUrl = `/uploads/${fileName}`;

        const { fileUrl } = await uploadClient.upload({
            data: buffer,
            mime: image.type,
            path: {
                folderPath: "genius-academy/images/courses",
            },
            originalFileName: image.name,
        });

        // ذخیره در دیتابیس
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
