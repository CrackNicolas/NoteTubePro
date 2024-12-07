import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_session } from '@/context/types/session';
import { Props_response } from "@/context/types/response";

import { Conect_database } from "@/backend/utils/db";

import Session from '@/backend/schemas/session';
import Autentication from '@/backend/logic/autentication';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const user_id = Autentication(req.cookies);
    if (!user_id) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    if (user_id !== process.env.ROL_ADMIN_USER_ID) return NextResponse.json<Props_response>({ status: 403, info: { message: "Acceso no autorizado" } });

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const sessions_expiret = await Session.find({ expiret: { $lt: new Date().toISOString() }, status: true });

        for (let session of sessions_expiret) {
            session.status = false;
            await session.save();
        }

        const sessions: Props_session[] = await Session.find();

        return NextResponse.json<Props_response>({ status: 200, data: sessions });
    } catch (error: unknown) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const user_id = Autentication(req.cookies);
    if (!user_id) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { id, status, last_time, expiret, origin, user } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const exists_session = await Session.findOne({ id });

        if (exists_session) {
            exists_session.status = status;
            exists_session.last_time = last_time;
            exists_session.origin = origin;
            exists_session.expiret = expiret;
            await exists_session.save();
            return NextResponse.json<Props_response>({ status: 400, info: { message: "La session ya está registrada" } });
        }

        const new_session = new Session({
            id, status, last_time, expiret, origin,
            user: {
                name: user.name,
                email: user.email,
                image: user.image,
                rol: user.rol
            }
        });

        await new_session.save();

        return NextResponse.json<Props_response>({ status: 201, info: { message: 'Session registrada' } });
    } catch (error: unknown) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const user_id = Autentication(req.cookies);
    if (!user_id) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { id, status } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const exists_session = await Session.findOne({ id });

        if (!exists_session) {
            return NextResponse.json<Props_response>({ status: 400, info: { message: "La sesion no existe" } });
        }

        exists_session.status = status;

        await exists_session.save();

        return NextResponse.json<Props_response>({ status: 201, info: { message: 'Session actualizada' } });
    } catch (error: unknown) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}