import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const url = formData.get("url") as string;
        const submenu_id = formData.get("submenu_id") as string;
        const order_index = parseFloat(formData.get("order_index") as string);

        await sql`
            INSERT INTO sub_submenus (title, url, order_index, submenu_id)
            VALUES (${title}, ${url}, ${order_index}, ${submenu_id})
        `;

        revalidateTag('sub_submenus');

        
        return NextResponse.json(
            { message: "sub-submenu Added Successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
