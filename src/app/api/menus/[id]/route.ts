import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        await sql`
            DELETE FROM menus WHERE id = ${id}
        `;
        revalidateTag("menus");
        return NextResponse.json(
            { success: true, message: "منو با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام حذف منو خطایی رخ داد" },
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
            SELECT * FROM menus WHERE id = ${id}
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
        const order_index = parseFloat(formData.get("order_index") as string);

        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }

        await sql`
            UPDATE menus 
            SET 
            title = ${title},
            url = ${url},
            order_index = ${order_index}
            WHERE id = ${id};
        `;
        revalidateTag("menus");

        return NextResponse.json(
            { success: true, message: "منو با موفقیت ویرایش شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام ویرایش منو خطایی رخ داد" },
            { status: 500 }
        );
    }
}
