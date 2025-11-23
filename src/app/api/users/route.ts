import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { sql } from "@/src/db";
import bcrypt from "bcryptjs";
import { uploadImage } from "@/src/lib/utils/uploadImage";
import { revalidateTag } from "next/cache";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "@/src/lib/type-definition";

export async function POST(req: Request) {
    try {
        const data = await req.formData();

        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const role = data.get("role") as string;
        const about = data.get("about") as string;
        const image = data.get("image") as File;
        const phone_number = data.get("phone_number") as string;
        const hashedPassword = await bcrypt.hash(password, 10);

        let imageUrl: string | null = null;

        if (image) {
            imageUrl = await uploadImage(image, "genius-academy/images/users");
        }

        const existing = await sql`SELECT * FROM users WHERE email = ${email}`;

        if (existing.length > 0) {
            return Response.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        const inserted = await sql`
            INSERT INTO users (name, email, password, role, image, about, phone_number)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role ?? 'user'}, ${imageUrl}, ${about}, ${phone_number}) RETURNING *
        `;

        const newUser = inserted[0];

        const payload = {
            id: newUser.id as string,
            name: newUser.name as string,
            email: newUser.email as string,
            role: newUser.role as string,
            image: newUser.image as string,
            about: newUser.about as string,
            phone_number: newUser.phone_number as string,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        const cookieStore = await cookies();

        cookieStore.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 Day
            sameSite: "lax",
        });

        revalidateTag("users");
        // return NextResponse.redirect(new URL("/", req.url));

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            token,
        });
    } catch (error) {
        return NextResponse.json({
            error: error,
            status: 500,
            message: "Server error",
        });
    }
}
