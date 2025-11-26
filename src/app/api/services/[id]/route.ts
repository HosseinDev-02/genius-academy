import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        await sql`DELETE FROM services WHERE id = ${id}`;
        revalidateTag('services');
        return NextResponse.json(
            { success: true, message: "سرویس با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: 'هنگام حذف سرویس خطایی رخ داد' }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const data = await sql`SELECT * FROM services WHERE id = ${id}`;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const key = formData.get("key") as string;

        await sql`
            UPDATE services 
            SET 
            title = ${title},
            key = ${key}
            WHERE id = ${id}
        `;
        revalidateTag('services');
        return NextResponse.json(
            { success: true, message: "سرویس با موفقیت ویرایش شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: 'هنگام ویرایش سرویس خطایی رخ داد' }, { status: 500 });
    }
}
