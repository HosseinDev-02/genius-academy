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

        await sql`DELETE FROM offers WHERE id = ${id}`;

        revalidateTag("offers");

        return NextResponse.json(
            { success: true, message: "تخفیف با موفقیت حذف شد" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "خطایی در حذف تخفیف رخ داد" },
            { status: 500 }
        );
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

        const [offer] =
            await sql`SELECT * FROM offers WHERE id = ${id} LIMIT 1`;

            console.log('prev offer', offer);

        const response = await sql`
            UPDATE offers
            SET is_active = ${!offer.is_active}
            WHERE id = ${id}
        `;
        revalidateTag("offers");

        return NextResponse.json(
            { success: true, message: "وضعیت تخفیف تغییر کرد", response },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "خطایی هنگام تغییر وضعیت تخفیف رخ داد" },
            { status: 500 }
        );
    }
}
