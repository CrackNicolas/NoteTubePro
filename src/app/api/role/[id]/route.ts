import { NextRequest, NextResponse } from "next/server";

import { RolUser } from "@/shared/enums/user/rol";
import { PropsResponse } from "@/shared/types/response";
import { handleApiRequest } from "@/backend/handlers/request";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        useConnectDb: false,
        processRequest: async (): Promise<PropsResponse> => {
            return { status: 200, details: (id === process.env.ROL_ADMIN_USER_ID) ? RolUser.ADMIN : RolUser.MEMBER }
        }
    })
}