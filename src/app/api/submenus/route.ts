import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data =
            await sql`SELECT * FROM submenus ORDER BY created_at DESC`;
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
        const menu_id = formData.get("menu_id") as string;
        const order_index = parseFloat(formData.get("order_index") as string);

        await sql`
            INSERT INTO submenus (title, url, order_index, menu_id)
            VALUES (${title}, ${url}, ${order_index}, ${menu_id});
        `;
        return NextResponse.json(
            { message: "Menu Added Successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}