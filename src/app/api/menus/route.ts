import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data = await sql`SELECT * FROM menus ORDER BY created_at DESC`;
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
        revalidateTag("menus");
        return NextResponse.json(
            { success: true, message: "منو با موفقیت ساخته شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام ساخت منو خطایی رخ داد" },
            { status: 500 }
        );
    }
}
