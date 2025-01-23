import { NextRequest, NextResponse } from "next/server";

import { httpRequest } from "@/backend/logic/requests";

export async function GET(req: NextRequest, { params: { image } }: { params: { image: string } }): Promise<NextResponse> {
    const cloudinaryUrl = `https://res.cloudinary.com/cracknicolas/image/upload/v1728426582/${image}`;

    try {
        const response = await httpRequest({ type: 'GET', url: cloudinaryUrl, config: { responseType: 'arraybuffer' } });

        const contentType = response.headers['content-type'] || 'image/*';

        return new NextResponse(Buffer.from(response.data), {
            status: 200,
            headers: {
                'Content-Type': contentType,
            },
        });
    } catch (error: unknown) {
        return NextResponse.json({ status: 500, info: { message: "Errores con el servidor" } })
    }
}