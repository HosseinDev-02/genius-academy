import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

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

        const response = await sql`
            UPDATE comments
            SET status = 'rejected'
            WHERE id = ${id}
        `;
        revalidateTag('comments');

        return NextResponse.json(
            { success: true, message: "نظر با موفقیت رد شد", response },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "خطایی در رد نظر رخ داد" },
            { status: 500 }
        );
    }
}
