import { NextResponse } from "next/server";
import { sql } from "@/src/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
    try {
        const { phone_number, password } = await req.json();

        // 1️⃣ چک کردن اینکه فیلدها وجود دارند
        if (!phone_number || !password) {
            return NextResponse.json(
                { error: "شماره تلفن و رمز عبور الزامی هستند" },
                { status: 400 }
            );
        }

        // 2️⃣ پیدا کردن کاربر با شماره تلفن
        const user = await sql`
      SELECT * FROM users WHERE phone_number = ${phone_number} LIMIT 1
    `;

        if (user.length === 0) {
            return NextResponse.json(
                { error: "کاربری با این شماره تلفن یافت نشد" },
                { status: 404 }
            );
        }

        const foundUser = user[0];

        // 3️⃣ مقایسه رمز هش شده
        const validPassword = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!validPassword) {
            return NextResponse.json(
                { error: "رمز عبور اشتباه است" },
                { status: 401 }
            );
        }

        // 4️⃣ ساخت payload تمیز
        const payload = {
            id: foundUser.id as string,
            name: foundUser.name as string,
            email: foundUser.email as string,
            role: foundUser.role as string,
            image: foundUser.image as string,
            about: foundUser.about as string,
            phone_number: foundUser.phone_number as string,
        };

        // 5️⃣ ساخت JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        // 6️⃣ ذخیره در HttpOnly Cookie
        const cookieStore = await cookies();

        cookieStore.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 روز
            sameSite: "lax",
        });

        return NextResponse.json({
            success: true,
            message: "ورود با موفقیت انجام شد",
            token, // اگر خواستی سمت کلاینت decode کنی، می‌گذاریم
        });
        
    } catch (err) {
        return NextResponse.json(
            { error: "مشکلی در فرآیند ورود رخ داد" },
            { status: 500 }
        );
    }
}
