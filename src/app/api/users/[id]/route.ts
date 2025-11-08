import { sql } from "@/src/db";
import bcrypt from "bcryptjs";
import { writeFile, unlink } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }
        const response = await sql`DELETE FROM users WHERE id = ${id}`;
        return NextResponse.json(
            { message: "کاربر با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "خطایی در حذف کاربر رخ داد" },
            { status: 500 }
        );
    }
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const result = await sql`SELECT * FROM users WHERE id = ${id}`;

        // اگر چیزی پیدا نشد
        if (result.length === 0) {
            return NextResponse.json(
                { message: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result[0], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const phone_number = formData.get("phone_number") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        const about = formData.get("about") as string;
        const image = formData.get("image") as File;

        const { id } = await context.params;
        const mainUserResponse = await sql`SELECT * FROM users WHERE id = ${id}`;
        const mainUser = mainUserResponse[0];

        let passwordHash = mainUser.password;
        console.log('old pass :', mainUser.password);

        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
            console.log('new password set :', passwordHash);
        }

        let imageUrl = mainUser.image;

        if (image && typeof image === "object" && "arrayBuffer" in image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${image.name}`;
            const filePath = path.join(
                process.cwd(),
                "public/uploads",
                fileName
            );
            await writeFile(filePath, buffer);

            imageUrl = `/uploads/${fileName}`;

            // حذف تصویر قبلی از سرور (اختیاری)

            const oldPath = mainUser.image;
            if (oldPath) {
                const oldFile = path.join(process.cwd(), "public", oldPath);
                try {
                    await unlink(oldFile);
                } catch {
                    console.warn("Old image not found or already deleted");
                }
            }
        }

        await sql`
            UPDATE users
            SET name = ${name},
                email = ${email},
                phone_number = ${phone_number},
                password = ${passwordHash},
                role = ${role},
                about = ${about},
                image = ${imageUrl}
            WHERE id = ${id};
          `;

        return NextResponse.json({ success: true, status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
