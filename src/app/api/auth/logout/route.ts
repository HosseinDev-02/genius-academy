import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "auth_token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
        sameSite: "lax",
    });

    return NextResponse.json({ message: "خارج شدید" });
}
