import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, description, course_id } = await req.json();

        await sql`
            INSERT INTO sessions (title, description, course_id)
            VALUES (${title}, ${description}, ${course_id});
        `;

        revalidateTag("sessions");

        return NextResponse.json(
            { success: true, message: "سرفصل با موفقیت ساخته شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "هنگام ساخت سرفصل خطایی رخ داد" },
            { status: 500 }
        );
    }
}
