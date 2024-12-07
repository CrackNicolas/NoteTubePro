import { NextRequest, NextResponse } from "next/server";

import { Props_response } from "@/context/types/response";

import Autentication from "@/backend/logic/autentication";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
    const user_id = Autentication(req.cookies);
    if (!user_id) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    try {
        return NextResponse.json({ status: 200, data: (id === process.env.ROL_ADMIN_USER_ID) ? 'admin' : 'member' })
    } catch (error: unknown) {
        return NextResponse.json({ status: 500, info: { message: "Errores con el servidor" } })
    }
}