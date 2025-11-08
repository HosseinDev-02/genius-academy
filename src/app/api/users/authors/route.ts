import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data = await sql`SELECT * FROM users WHERE role = 'author' ORDER BY created_at DESC`
        return NextResponse.json(data, { status: 201 })
    }catch(error) {
        return NextResponse.json({ error: 'Failed To Get Authors' }, { status: 500 })
    }
}