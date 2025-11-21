import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { sql } from "@/src/db";
import bcrypt from "bcryptjs";
import { uploadImage } from "@/src/lib/utils/uploadImage";
import { revalidateTag } from "next/cache";

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

        console.log({
            name,
            email,
            password,
            role,
            about,
            imageUrl,
            phone_number,
        });

        const response = await sql`
            INSERT INTO users (name, email, password, role, image, about, phone_number)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${imageUrl}, ${about}, ${phone_number}) RETURNING *
        `;

        console.log("response :", response);

        revalidateTag("users");

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: response[0],
        });
    } catch (error) {
        return NextResponse.json({
            error: "هنگام ذخیره کاربر مشکلی پیش امد",
            status: 500,
        });
    }
}
