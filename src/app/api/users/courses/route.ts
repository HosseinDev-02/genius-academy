import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { user_id, course_id } = await req.json();
        await sql`
            INSERT INTO user_courses (user_id, course_id)
            VALUES (${user_id}, ${course_id}) RETURNING *;
        `;
        revalidateTag('user_courses');
        return NextResponse.json(
            { success: true, message: "دوره با موفقیت افزوده شد" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "هنگام افزودن دوره خطایی رخ داد" },
            { status: 500 }
        );
    }
}


