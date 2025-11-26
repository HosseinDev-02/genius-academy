import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data =
            await sql`SELECT * FROM categories ORDER BY created_at DESC`;
        revalidateTag("categories");
        return NextResponse.json({ data, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const categoryData = await req.formData();

        const title = categoryData.get("title");
        const short_name = categoryData.get("short_name");

        await sql`
            INSERT INTO categories (title, short_name)
            VALUES (${title}, ${short_name})
        `;
        revalidateTag("categories");
        return NextResponse.json(
            { success: true, message: "دسته بندی با موفقیت ایجاد شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام ایجاد دسته بندی خطایی رخ داد" },
            { status: 500 }
        );
    }
}
