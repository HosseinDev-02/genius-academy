import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { sql } from "@/src/db";
import bcrypt from "bcryptjs";
import { uploadImage } from "@/src/utils";

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
        
        const imageUrl = await uploadImage(image, "genius-academy/images/users")

        const response = await sql`
            INSERT INTO users (name, email, password, role, image, about, phone_number)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${imageUrl}, ${about}, ${phone_number})
        `;

        console.log(response);

        return NextResponse.json({ message: "User created successfully", success: true });
    } catch (error) {
        return NextResponse.json({
            error: "هنگام ذخیره کاربر مشکلی پیش امد",
            status: 500,
        });
    }
}
