import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const course_id = formData.get("course_id") as string;

        await sql`
            INSERT INTO sessions (title, description, course_id)
            VALUES (${title}, ${description}, ${course_id});
        `;

        return NextResponse.json(
            { message: "Session created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
