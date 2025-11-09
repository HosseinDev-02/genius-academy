import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data = await sql`SELECT * FROM services ORDER BY created_at DESC`;
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const key = formData.get("key") as string;

        await sql`
            INSERT INTO services (title, key)
            VALUES (${title}, ${key})
        `;

        return NextResponse.json(
            { message: "Service created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
