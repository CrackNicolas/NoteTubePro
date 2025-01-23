import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import Category from '@/backend/schemas/category';
import autentication from '@/backend/logic/autentication';

import { PropsResponse } from '@/context/types/response';
import { PropsCategory } from '@/context/types/category';

import { conectDatabase } from '@/backend/utils/db';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: boolean } }): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const userCategorys = await Category.find({ "use.userId": userId });

        const categorys = userCategorys.filter(category =>
            category.use.some((prev: { userId: string, value: boolean }) => prev.userId === userId && prev.value == (segment ? true : false))
        );

        let filterCategorys: PropsCategory[] = [];

        categorys.map(category => {
            filterCategorys.push({
                title: category.title,
                use: category.use.find((prev: { value: true, userId: string }) => prev.userId == userId).value,
                icon: category.icon
            })
        })

        return NextResponse.json<PropsResponse>({ status: 200, data: filterCategorys });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}