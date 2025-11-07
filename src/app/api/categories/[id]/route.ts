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
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        const response = await sql`
            DELETE FROM categories WHERE id = ${id}
        `;
        return NextResponse.json(
            { message: "دسته با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "خطایی در حذف دسته بندی رخ داد" },
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
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        const data = await sql`
            SELECT * FROM categories WHERE id = ${id}
        `;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
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
        const short_name = formData.get("short_name");

        console.log('title :', title);
        console.log('short_name :', short_name);

        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        await sql`
            UPDATE categories 
            SET 
            title = ${title},
            short_name = ${short_name}
            WHERE id = ${id}
        `;

        return NextResponse.json({success: true, message: "دسته با موفقیت ویرایش شد"}, {status: 201});
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام ویرایش دسته بندی خطایی رخ داد" },
            { status: 500 }
        );
    }
}
