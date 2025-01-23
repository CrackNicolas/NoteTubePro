import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsResponse } from '@/context/types/response';
import { PropsDeleteNote, PropsNote } from '@/context/types/note';

import { query } from '@/backend/api/query';
import { fileDelete } from '@/backend/utils/cloudinary';
import { conectDatabase } from "@/backend/utils/db";

import Notes from '@/backend/schemas/note';
import autentication from '@/backend/logic/autentication';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const notes: PropsNote[] = await Notes.find(query(userId, segment));

        return NextResponse.json<PropsResponse>({ status: 200, data: notes })
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}
export async function DELETE(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const notes = JSON.parse(segment);

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const resultMongodb = await Notes.deleteMany(
            { _id: { $in: notes.map((n: PropsDeleteNote) => n._id) } }
        );

        await fileDelete(
            notes.filter((n: PropsDeleteNote) => n.file !== undefined).map((n: PropsDeleteNote) => n.file)
        );

        return NextResponse.json<PropsResponse>({ status: 200, info: { message: `${(notes.length === 1) ? '1 nota eliminada' : `${resultMongodb.deletedCount} de ${notes.length} notas eliminadas`}` } })
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}