import * as ByteScale from "@bytescale/sdk";

export async function uploadImage(
    file: File,
    setUploading?: React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        // 1) گرفتن signature
        if (setUploading) {
            setUploading(true);
        }
        const { timestamp, signature, apiKey, cloudName } = await fetch(
            "/api/cloudinary-image-sign",
            { method: "POST" }
        ).then((r) => r.json());

        // 2) فرم دیتا
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "images");

        // 3) آپلود تصویر
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        ).then((r) => r.json());
        if (setUploading) {
            setUploading(false);
        }
        console.log("image url :", uploadResponse.secure_url);
        return uploadResponse.secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }
}
