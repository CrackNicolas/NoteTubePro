import { NextRequest, NextResponse } from "next/server";

import { PropsResponse } from "@/context/types/response";

import autentication from "@/backend/logic/autentication";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    try {
        return NextResponse.json({ status: 200, data: (id === process.env.ROL_ADMIN_USER_ID) ? 'admin' : 'member' })
    } catch (error: unknown) {
        return NextResponse.json({ status: 500, info: { message: "Errores con el servidor" } })
    }
}