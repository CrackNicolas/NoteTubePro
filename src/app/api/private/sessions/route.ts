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

            const [updateSessionsExpiret, sessions] = await Promise.all([
                Session.updateMany(
                    { expiret: { $lt: new Date().toISOString() }, status: true },
                    { $set: { status: false } }
                ),
                Session.find().lean().select({
                    "_id": 0,
                    "updatedAt": 0,
                    "__v": 0
                })
            ]);

            return { status: 200, details: sessions as PropsSession[] };
        }
    })
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (): Promise<PropsResponse> => {
            const { id, status, lastTime, expiret, origin, user } = await req.json();

            const sessionData: PropsSession = {
                status,
                lastTime,
                expiret,
                origin,
                user
            };
            
            const session = await Session.findOneAndUpdate(
                { id }, 
                { $set: sessionData },
                { new: true, upsert: true }  // Si no existe, lo crea; si existe, lo actualiza
            );

            if (session) {
                if (session.isNew) {
                    return { status: 201, info: { message: 'Session registrada' } };
                }
                return { status: 200, info: { message: 'Sesión actualizada' } };
            }

            return { status: 201, info: { message: 'Session registrada' } };
        }
    })
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        useCredentialsClerk: false,
        processRequest: async (): Promise<PropsResponse> => {
            const { id, status } = await req.json();

            const session = await Session.findOneAndUpdate(
                { id },
                { $set: { status } },
                { new: true }
            );

            if (!session) {
                return { status: 404, info: { message: "La sesión no existe" } };  // Mejor usar 404
            }

            return { status: 200, info: { message: 'Sesión actualizada' } }; 
        }
    })
}