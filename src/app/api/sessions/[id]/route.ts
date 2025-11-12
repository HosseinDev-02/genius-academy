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
        await sql`DELETE FROM sessions WHERE id = ${id}`;
        return NextResponse.json(
            { message: "جلسه با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
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
        const formData = await req.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const course_id = formData.get("course_id");

        await sql`
        UPDATE sessions 
        SET title = ${title}, 
        description = ${description}, 
        course_id = ${course_id} 
        WHERE id = ${id}
        `;
        
        return NextResponse.json(
            { message: "session updated successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
