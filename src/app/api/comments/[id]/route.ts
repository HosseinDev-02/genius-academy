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
        await sql`DELETE FROM comments WHERE id = ${id}`;
        revalidateTag("comments");
        return NextResponse.json(
            { success: true, message: "نظر با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "خطایی در حذف نظر رخ داد" },
            { status: 500 }
        );
    }
}
