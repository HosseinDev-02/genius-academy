export const uploadVideo = async (file: File) => {
    try {
        const { timestamp, signature, apiKey, cloudName } = await fetch(
            "/api/uploads/video",
            { method: "POST" }
        ).then((r) => r.json());

        // 2) فرم داده برای ویدیو
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "videos");
        formData.append("resource_type", "video");

        // 3) آپلود فایل ویدیو به Cloudinary
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const result = await uploadResponse.json();
        return {
            url: result.secure_url,
            duration: result.duration,
        };
    } catch (error) {
        console.log(error);
        return {};
    }
};
