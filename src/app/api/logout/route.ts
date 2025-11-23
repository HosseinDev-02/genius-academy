import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();

        cookieStore.set({
            name: "auth_token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 0, // ← حذف کوکی
            sameSite: "lax",
        });

        return NextResponse.json({
            success: true,
            message: "شما خارج شدید",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "خطا هنگام خروج از سایت" },
            { status: 500 }
        );
    }
}
