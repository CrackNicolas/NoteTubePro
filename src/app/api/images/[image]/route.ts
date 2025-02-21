import { NextRequest, NextResponse } from "next/server";

import { httpRequest } from "@/shared/logic/requests";
import { MessageResponse } from "@/backend/enums/messages/response";

export async function GET(req: NextRequest, { params: { image } }: { params: { image: string } }): Promise<NextResponse> {
    const cloudinaryUrl: string = `https://res.cloudinary.com/cracknicolas/image/upload/v1728426582/${image}`;

    try {
        const response = await httpRequest({ type: 'GET', url: cloudinaryUrl, config: { responseType: 'arraybuffer' } });

        const contentType = response.headers['content-type'] || 'image/*';

        return new NextResponse(Buffer.from(response.data), {
            status: 200,
            headers: {
                'Content-Type': contentType,
            }
        })
    } catch (error: unknown) {
        return NextResponse.json({ status: 500, info: { message: MessageResponse.ERROR_SERVER } })
    }
}