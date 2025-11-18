import  * as ByteScale from '@bytescale/sdk';

export async function uploadImage(file: File, folderPath: string) {

    try {
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

        return fileUrl;
    }catch(error){
        console.log(error);
        return null
    }

}