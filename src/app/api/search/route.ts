import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) return NextResponse.json([]);

    const result = await sql`
    SELECT id, title, short_name, 'course' AS type
    FROM courses
    WHERE title ILIKE '%' || ${q} || '%'

    UNION ALL

    SELECT id, title, short_name, 'article' AS type
    FROM articles
    WHERE title ILIKE '%' || ${q} || '%'

    LIMIT 10
  `;

    return NextResponse.json(result);
}
