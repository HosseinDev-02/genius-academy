import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data =
            await sql`SELECT * FROM menus ORDER BY created_at DESC`;
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const url = formData.get("url") as string;
        const order_index = parseFloat(formData.get("order_index") as string);

        await sql`
            INSERT INTO menus (title, url, order_index)
            VALUES (${title}, ${url}, ${order_index})
        `;
        return NextResponse.json(
            { message: "Menu Added Successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
