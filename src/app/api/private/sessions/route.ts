import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsSession } from '@/context/types/session';
import { PropsResponse } from "@/context/types/response";

import { conectDatabase } from "@/backend/utils/db";

import Session from '@/backend/schemas/session';
import autentication from '@/backend/logic/autentication';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    if (userId !== process.env.ROL_ADMIN_USER_ID) return NextResponse.json<PropsResponse>({ status: 403, info: { message: "Acceso no autorizado" } });

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const sessionsExpiret = await Session.find({ expiret: { $lt: new Date().toISOString() }, status: true });

        for (let session of sessionsExpiret) {
            session.status = false;
            await session.save();
        }

        const sessions: PropsSession[] = await Session.find();

        return NextResponse.json<PropsResponse>({ status: 200, data: sessions });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { id, status, lastTime, expiret, origin, user } = await req.json();

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const existsSession = await Session.findOne({ id });

        if (existsSession) {
            existsSession.status = status;
            existsSession.lastTime = lastTime;
            existsSession.origin = origin;
            existsSession.expiret = expiret;
            await existsSession.save();
            return NextResponse.json<PropsResponse>({ status: 400, info: { message: "La session ya está registrada" } });
        }

        const newSession = new Session({
            id, status, lastTime, expiret, origin,
            user: {
                name: user.name,
                email: user.email,
                image: user.image,
                rol: user.rol
            }
        });

        await newSession.save();

        return NextResponse.json<PropsResponse>({ status: 201, info: { message: 'Session registrada' } });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { id, status } = await req.json();

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const existsSession = await Session.findOne({ id });

        if (!existsSession) {
            return NextResponse.json<PropsResponse>({ status: 400, info: { message: "La sesion no existe" } });
        }

        existsSession.status = status;

        await existsSession.save();

        return NextResponse.json<PropsResponse>({ status: 201, info: { message: 'Session actualizada' } });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}