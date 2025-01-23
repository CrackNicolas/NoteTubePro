import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

type PropsFile = {
    id?: string,
    url?: string
}

export async function fileTransformer(file: File): Promise<PropsFile> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
        }).end(buffer);
    });

    return {
        id: response?.public_id,
        url: response?.secure_url
    }
}
export async function fileEdit(id: string, file: File): Promise<PropsFile> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ public_id: id, overwrite: true }, (err, result) => {
            if (err) reject(err);
            resolve(result);
        }).end(buffer);
    });

    return {
        id: response?.public_id,
        url: response?.secure_url
    }
}
export async function fileDelete(filesId: string[]): Promise<UploadApiResponse[] | undefined> {
    if (filesId.length === 0) return;

    const promises: Promise<UploadApiResponse>[] = filesId.map((id: string) => {
        return cloudinary.uploader.destroy(id);
    })

    return await Promise.all(promises);
}