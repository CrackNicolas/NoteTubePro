import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_response } from '@/context/types/response';
import { Props_delete_note, Props_note } from '@/context/types/note';

import { Query } from '@/backend/api/query';
import { File_delete } from '@/backend/utils/cloudinary';
import { Conect_database } from "@/backend/utils/db";

import Notes from '@/backend/schemas/note';
import Autentication from '@/backend/logic/autentication';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    const user_id = Autentication(req.cookies);
    if (!user_id) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const notes: Props_note[] = await Notes.find(Query(user_id, segment));

        return NextResponse.json<Props_response>({ status: 200, data: notes })
    } catch (error: unknown) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}
export async function DELETE(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    const user_id = Autentication(req.cookies);
    if (!user_id) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const notes = JSON.parse(segment);

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const result_mongodb = await Notes.deleteMany(
            { _id: { $in: notes.map((n: Props_delete_note) => n._id) } }
        );

        await File_delete(
            notes.filter((n: Props_delete_note) => n.file !== undefined).map((n: Props_delete_note) => n.file)
        );

        return NextResponse.json<Props_response>({ status: 200, info: { message: `${(notes.length === 1) ? '1 nota eliminada' : `${result_mongodb.deletedCount} de ${notes.length} notas eliminadas`}` } })
    } catch (error: unknown) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}