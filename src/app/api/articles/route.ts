import { sql } from "@/src/db";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server"
import path from "path";

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
        const image = formData.get("image") as File;

        // ذخیره فایل در پوشه public/uploads
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${image.name}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        await writeFile(filePath, buffer);

        const imageUrl = `/uploads/${fileName}`;

        // ذخیره در دیتابیس
        await sql`
            INSERT INTO articles (title, content, category_id, user_id, short_name, time_read, about, image)
            VALUES (${title}, ${content}, ${category_id}, ${user_id}, ${short_name}, ${time_read}, ${about}, ${imageUrl})
        `;

        return NextResponse.json({ message: 'Article Added Successfully' }, { status: 201 });
    }catch(error) {
        return NextResponse.json({ error: 'Failed To Add Article'}, { status: 500 })
    }
}