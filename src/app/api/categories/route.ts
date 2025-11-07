import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const data = await sql`SELECT * FROM categories ORDER BY created_at DESC`;
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}