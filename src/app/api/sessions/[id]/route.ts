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
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        await sql`DELETE FROM sessions WHERE id = ${id}`;
        revalidateTag("sessions");
        return NextResponse.json(
            { success: true, message: "سرفصل با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام حذف سرفصل خطایی رخ داد" },
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
        const data = await sql`SELECT * FROM sessions WHERE id = ${id}`;
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
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        const { title, description, course_id } = await req.json();

        await sql`
        UPDATE sessions 
        SET title = ${title}, 
        description = ${description}, 
        course_id = ${course_id} 
        WHERE id = ${id}
        `;
        revalidateTag('sessions')

        return NextResponse.json(
            { success: true, message: "سرفصل با موفقیت ویرایش شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام ویرایش سرفصل خطایی رخ داد" },
            { status: 500 }
        );
    }
}
