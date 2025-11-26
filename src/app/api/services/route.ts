import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
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

        revalidateTag('services')

        return NextResponse.json(
            { success: true, message: "سرویس با موفقیت ساخته شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: 'هنگام ساخت سرویس خطایی رخ داد' }, { status: 500 });
    }
}
