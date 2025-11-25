import { sql } from "@/src/db";
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

        return NextResponse.json(
            { message: "نظر با موفقیت رد شد", response },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
