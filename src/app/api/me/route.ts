import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { sql } from "@/src/db";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if(!token) return NextResponse.json({ user: null }, { status: 200 })

        const decoded : any = jwt.verify(token, process.env.JWT_SECRET!)
        
        const rows = await sql`SELECT * FROM users WHERE id = ${decoded.id} LIMIT 1`
        const user = rows[0] ?? null

        return NextResponse.json({ user }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ user: null }, { status: 401 })
    }
}