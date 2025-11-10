import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { message: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        await sql`
            DELETE FROM sub_submenus WHERE id = ${id}
        `;
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const formData = await req.formData();
        const { id } = await context.params;

        const title = formData.get("title");
        const url = formData.get("url");
        const submenu_id = formData.get("submenu_id");
        const order_index = parseFloat(formData.get("order_index") as string);

        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        await sql`
            UPDATE sub_submenus 
            SET 
            title = ${title},
            url = ${url},
            submenu_id = ${submenu_id},
            order_index = ${order_index}
            WHERE id = ${id};
        `;

        return NextResponse.json(
            { success: true, message: "زیرمنو فرعی با موفقیت ویرایش شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const data = await sql`
            SELECT * FROM sub_submenus WHERE id = ${id}
        `;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
