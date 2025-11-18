import { NextResponse } from "next/server";
import * as ByteScale from "@bytescale/sdk";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folderPath = formData.get("folderPath") as string;

        const arrayBuffer = await file.arrayBuffer();
        const uploadManager = new ByteScale.UploadManager({
            apiKey: process.env.BYTESCALE_API_KEY!,
        });

        const { fileUrl } = await uploadManager.upload({
            data: Buffer.from(arrayBuffer),
            path: { folderPath },
            originalFileName: file.name,
            mime: file.type,
        });

        console.log('fileUrl', fileUrl);

        return NextResponse.json({ fileUrl });
    } catch (e) {
        return NextResponse.json(
            { error: (e as Error).message },
            { status: 500 }
        );
    }
}
