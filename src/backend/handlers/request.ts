import { NextResponse } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

import autentication from "@/backend/logic/autentication";
import sendApiResponse from "@/backend/handlers/response";

import { conectDatabase } from "@/backend/utils/db";

import { PropsResponse } from "@/shared/types/response";
import { MessagesNote } from "@/shared/enums/messages/note";

interface IApiRequest {
    cookies: RequestCookies,
    useConnectDb?: boolean,
    processRequest: (userId: string) => Promise<PropsResponse>
}

export async function handleApiRequest({ cookies, processRequest, useConnectDb = true }: IApiRequest): Promise<NextResponse> {
    const userId = autentication(cookies);
    if (!userId) return sendApiResponse({ status: 401 });

    if (useConnectDb) {
        const connection: boolean = await conectDatabase();
        if (!connection) return sendApiResponse({ status: 500 });
    }

    try {
        const result = await processRequest(userId);
        return sendApiResponse(result);
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return sendApiResponse({ status: 400, info: { message: MessagesNote.DUPLICATED } })
        }
        return sendApiResponse({ status: 500 });
    }
}