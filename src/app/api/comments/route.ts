import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { content, user_id, article_id, course_id, parent_id } =
            await req.json();

        console.log({ content, user_id, article_id, course_id, parent_id });

        await sql`
            INSERT INTO comments (content, user_id, course_id, article_id, parent_id)
            VALUES (${content}, ${user_id}, ${course_id || null}, ${
            article_id || null
        }, ${parent_id || null})
        `;

        revalidateTag("comments");

        return NextResponse.json(
            { success: true, message: "کامنت شما با موفقیت ارسال شد" },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: "هنگام ارسال کامنت خطایی رخ داد" },
            { status: 500 }
        );
    }
}
