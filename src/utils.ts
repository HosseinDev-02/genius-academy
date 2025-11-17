import * as ByteScale from "@bytescale/sdk";

const scrollToSection = (sectionId: string): void => {
    if (!sectionId) return;
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};


const uploadManager = new ByteScale.UploadManager({
    apiKey: process.env.BYTESCALE_API_KEY!,
});

export async function uploadImage(file: File, folderPath: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { fileUrl } = await uploadManager.upload({
    data: buffer,
    path: {
        folderPath: folderPath,
    },
    originalFileName: file.name,
    mime: file.type,
    // onProgress: (progress) => {
    //   console.log('progress :', progress) // 0–100
    // },
  });

  return fileUrl;
}

export { scrollToSection };