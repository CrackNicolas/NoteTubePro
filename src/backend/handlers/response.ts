import { NextResponse } from "next/server";
import { MessageResponse } from "@/backend/enums/messages/response";
import { PropsResponse, HttpStatusCode } from "@/shared/types/response";

export default function sendApiResponse(data: PropsResponse): NextResponse<PropsResponse> {
    const { status, details, info } = data;

    return NextResponse.json<PropsResponse>({
        status,
        details,
        info
    })

    const messages: Record<HttpStatusCode, string> = {
        200: MessageResponse.SUCCESS,
        201: MessageResponse.CREATED,
        204: MessageResponse.NO_CONTENT,
        400: MessageResponse.BAD_REQUEST,
        401: MessageResponse.INVALID_CREDENTIALS,
        403: MessageResponse.ACCESS_DENIED,
        404: MessageResponse.NOT_FOUND,
        500: MessageResponse.ERROR_SERVER
    }

    return NextResponse.json<PropsResponse>({
        status,
        details,
        info: {
            message: (data.info?.message) ?? messages[status]
        }
    })
}