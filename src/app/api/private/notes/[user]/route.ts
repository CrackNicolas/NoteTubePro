import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsNote } from '@/context/types/note';
import { PropsResponse } from "@/context/types/response";

import { conectDatabase } from "@/backend/utils/db";

import Notes from '@/backend/schemas/note';
import autentication from '@/backend/logic/autentication';

export async function GET(req: NextRequest, { params: { user } }: { params: { user: string } }): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    if (userId !== process.env.ROL_ADMIN_USER_ID) return NextResponse.json<PropsResponse>({ status: 403, info: { message: "Acceso no autorizado" } });

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const notes: PropsNote[] = await Notes.find({ userId: user });

        return NextResponse.json<PropsResponse>({ status: 200, data: notes });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}