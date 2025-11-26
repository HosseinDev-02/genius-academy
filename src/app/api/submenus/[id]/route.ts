import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
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
            DELETE FROM submenus WHERE id = ${id}
        `;
        revalidateTag("submenus");

        return NextResponse.json({ success: true, message: 'زیرمنو با موفقیت حذف شد' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'هنگام حذف زیرمنو خطایی رخ داد'}, { status: 500 });
    }
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const data = await sql`
            SELECT * FROM submenus WHERE id = ${id}
        `;
        return NextResponse.json(data[0], { status: 201 });
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
        const menu_id = formData.get("menu_id");
        const order_index = parseFloat(formData.get("order_index") as string);

        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        await sql`
            UPDATE submenus 
            SET 
            title = ${title},
            url = ${url},
            menu_id = ${menu_id},
            order_index = ${order_index}
            WHERE id = ${id};
        `;
        revalidateTag('submenus');

        return NextResponse.json(
            { success: true, message: "زیر منو با موفقیت ویرایش شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'هنگام ویرایش زیرمنو خطایی رخ داد' },
            { status: 500 }
        );
    }
}
