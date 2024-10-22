import jwt from 'jsonwebtoken';

import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

import Category from '@/backend/schemas/category';

import { Props_response } from '@/context/types/response';
import { Props_category } from '@/context/types/category';

import { Conect_database } from '@/backend/utils/db';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: boolean } }): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const user_id = jwt.decode(token)?.sub;

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } })

    try {
        const user_categorys = await Category.find({ "use.user_id": user_id });

        const categorys = user_categorys.filter(category =>
            category.use.some((prev: { user_id: string, value: boolean }) => prev.user_id === user_id && prev.value == (segment ? true : false))
        );

        let filter_categorys: Props_category[] = [];

        categorys.map(category => {
            filter_categorys.push({
                title: category.title,
                use: category.use.find((prev: { value: true, user_id: string }) => prev.user_id == user_id).value,
                icon: category.icon
            })
        })

        return NextResponse.json<Props_response>({ status: 200, data: filter_categorys });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } });
    }
}