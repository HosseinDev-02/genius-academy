import { NextResponse } from "next/server";
import path from "path";
import { writeFile, access } from "fs/promises";
import { constants } from "fs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const fileName = file.name; // از نام اصلی استفاده می‌کنیم
        const uploadDir = path.join(process.cwd(), "public/uploads");
        const filePath = path.join(uploadDir, fileName);

        // بررسی وجود فایل
        try {
            await access(filePath, constants.F_OK);
            // اگر فایل وجود داشت:
            return NextResponse.json({
                message: "File already exists",
                url: `/uploads/${fileName}`,
                exists: true,
            });
        } catch {
            // اگر فایل وجود نداشت، می‌ریم برای ذخیره
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            message: "File uploaded successfully",
            url: `/uploads/${fileName}`,
            exists: false,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
