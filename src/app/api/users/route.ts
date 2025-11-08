import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { sql } from "@/src/db";
import bcrypt from "bcryptjs";

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

        console.log('data :', data)

        // ذخیره فایل در پوشه public/uploads
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${image.name}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);
        await writeFile(filePath, buffer);

        const imageUrl = `/uploads/${fileName}`;

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
