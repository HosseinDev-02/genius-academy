import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data =
            await sql`SELECT * FROM categories ORDER BY created_at DESC`;
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const categoryData = await req.formData();

        const title = categoryData.get("title");
        const short_name = categoryData.get("short_name");

        if (typeof title !== "string" || typeof short_name !== "string") {
            return NextResponse.json(
                { error: "Invalid request data" },
                { status: 400 }
            );
        }

        await sql`
            INSERT INTO categories (title, short_name)
            VALUES (${title}, ${short_name})
        `;
        return NextResponse.json(
            { message: "Category created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
