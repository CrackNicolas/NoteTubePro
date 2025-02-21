import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsSession } from '@/context/types/session';
import { PropsResponse } from "@/shared/types/response";
import { handleApiRequest } from '@/backend/handlers/request';

import Session from '@/backend/schemas/session';

export async function GET(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            if (userId !== process.env.ROL_ADMIN_USER_ID) return { status: 403 };

            const sessionsExpiret = await Session.find({ expiret: { $lt: new Date().toISOString() }, status: true });

            for (let session of sessionsExpiret) {
                session.status = false;
                await session.save();
            }

            const sessions: PropsSession[] = await Session.find();

            return { status: 200, details: sessions };
        }
    })
}
export async function POST(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (): Promise<PropsResponse> => {
            const { id, status, lastTime, expiret, origin, user } = await req.json();

            const existsSession = await Session.findOne({ id });

            if (existsSession) {
                existsSession.status = status;
                existsSession.lastTime = lastTime;
                existsSession.origin = origin;
                existsSession.expiret = expiret;
                await existsSession.save();

                return { status: 400, info: { message: "La session ya está registrada" } };
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

            return { status: 201, info: { message: 'Session registrada' } };
        }
    })
}
export async function PUT(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (): Promise<PropsResponse> => {
            const { id, status } = await req.json();

            const existsSession = await Session.findOne({ id });

            if (!existsSession) {
                return { status: 400, info: { message: "La sesion no existe" } };
            }

            existsSession.status = status;
            await existsSession.save();

            return { status: 201, info: { message: 'Session actualizada' } };
        }
    })
}