import { sql } from "@/src/db";
import { uploadImage } from "@/src/lib/utils/uploadImage";
import bcrypt from "bcryptjs";
import { writeFile, unlink } from "fs/promises";
import { revalidateTag } from "next/cache";
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
        revalidateTag("users");
        return NextResponse.json(
            { success: true, message: "کاربر با موفقیت حذف شد", id },
            { status: 201 }
        );
    } catch (error) {
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
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const mainUserResponse =
            await sql`SELECT * FROM users WHERE id = ${id}`;
        const mainUser = mainUserResponse[0];

        const formData = await req.formData();
        const name = formData.get("name") as string;
        const phone_number = formData.get("phone_number") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repeat_password = formData.get("repeat_password") as string;
        const role = formData.get("role") as string;
        const about = formData.get("about") as string;
        const image = formData.get("image") as File;

        let passwordHash = mainUser.password;

        if (
            repeat_password &&
            password &&
            password.trim() !== "" &&
            repeat_password.trim() !== ""
        ) {
            if (password !== repeat_password) {
                return NextResponse.json(
                    { error: "رمز عبور با تکرار آن مطابقت ندارد" },
                    { status: 400 }
                );
            }
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
        }

        let imageUrl: string | null = null;

        if (image && typeof image === "object" && "arrayBuffer" in image) {
            imageUrl = await uploadImage(image, "genius-academy/images/users");
        }

        // اگر تصویر جدیدی نیست، مقدار قبلی حفظ شود
        if (!imageUrl) {
            const oldImage =
                await sql`SELECT image FROM users WHERE id = ${id}`;
            imageUrl = oldImage[0]?.image || null;
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

        revalidateTag("users");

        return NextResponse.json(
            { success: true, message: "کاربر با موفقیت ویرایش شد" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "خطایی در ویرایش کاربر رخ داد" },
            { status: 500 }
        );
    }
}
