import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { course_id, is_active, discount_percent, code } =
            await req.json();

        await sql`
            INSERT INTO offers (course_id, is_active, discount_percent, code)
            VALUES (${course_id}, 
                ${
                    is_active === "active" ? true : false
                }, ${discount_percent}, ${code});
        `;

        revalidateTag('offers');

        return NextResponse.json({ success: true, message: "تخفیف با موفقیت ساخته شد" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'خطایی در ساخت تخفیف رخ داد' }, { status: 500 });
    }
}
