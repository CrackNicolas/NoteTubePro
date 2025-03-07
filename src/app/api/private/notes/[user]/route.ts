import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsNote } from '@/context/types/note';
import { PropsResponse } from "@/shared/types/response";
import { handleApiRequest } from '@/backend/handlers/request';

import Notes from '@/backend/schemas/note';

export async function GET(req: NextRequest, { params: { user } }: { params: { user: string } }): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            if (userId !== process.env.ROL_ADMIN_USER_ID) return { status: 403 };

            const notes: PropsNote[] = await Notes.find({ userId: user }).lean().select({
                "updatedAt": 0,
                "__v": 0
            });

            return { status: 200, details: notes }
        }
    })
}