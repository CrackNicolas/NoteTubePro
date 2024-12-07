import { NextRequest, NextResponse } from "next/server";

import { Request } from "@/backend/logic/requests";

export async function GET(req: NextRequest, { params: { image } }: { params: { image: string } }): Promise<NextResponse> {
    const cloudinary_url = `https://res.cloudinary.com/cracknicolas/image/upload/v1728426582/${image}`;

    try {
        const response = await Request('GET', cloudinary_url, { responseType: 'arraybuffer' });

        const content_type = response.headers['content-type'] || 'image/*';

        return new NextResponse(Buffer.from(response.data), {
            status: 200,
            headers: {
                'Content-Type': content_type,
            },
        });
    } catch (error: unknown) {
        return NextResponse.json({ status: 500, info: { message: "Errores con el servidor" } })
    }
}