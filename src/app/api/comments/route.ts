import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const content = formData.get('content')
        const user_id = formData.get('user_id')
        const course_id = formData.get('course_id')
        const article_id = formData.get('article_id')
        const parent_id = formData.get('parent_id')

        console.log({ content, user_id, article_id, course_id, parent_id });

        await sql`
            INSERT INTO comments (content, user_id, course_id, article_id, parent_id)
            VALUES (${content}, ${user_id}, ${course_id || null}, ${article_id || null}, ${parent_id || null})
        `

        return NextResponse.json({ message: 'Comment created successfully' }, { status: 201 })

    }catch(error){
        return NextResponse.json(error, { status: 500 })
    }
}