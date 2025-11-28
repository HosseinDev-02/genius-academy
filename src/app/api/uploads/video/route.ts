import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.v2.utils.api_sign_request(
        {
            timestamp,
            folder: "videos", // نام فولدر مقصد در Cloudinary
        },
        process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
        timestamp,
        signature,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });
}
