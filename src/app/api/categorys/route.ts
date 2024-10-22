import jwt from 'jsonwebtoken';

import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_response } from "@/context/types/response";
import { Props_category } from "@/context/types/category";

import { Conect_database } from "@/backend/utils/db";

import Category from '@/backend/schemas/category'

export async function GET(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const user_id = jwt.decode(token)?.sub;

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const count: number = await Category.countDocuments();
        if (count === 0) {
            await Category.create([
                { title: 'Proyecto', use: [{ value: true, user_id }], icon: 'proyects' },
                { title: 'Trabajo', use: [{ value: true, user_id }], icon: 'briefcase' },
                { title: 'Inversion', use: [{ value: true, user_id }], icon: 'investment' },
                { title: 'Estudios', use: [{ value: true, user_id }], icon: 'studies' },
                { title: 'Personal', use: [{ value: true, user_id }], icon: 'person' },
                { title: 'Viajes', use: [{ value: true, user_id }], icon: 'plane' },
                { title: 'Historias', use: [{ value: true, user_id }], icon: 'stories' },
                { title: 'Peliculas', use: [{ value: true, user_id }], icon: 'film' },
                { title: 'Musicas', use: [{ value: true, user_id }], icon: 'music' },
                { title: 'Otros', use: [{ value: true, user_id }], icon: 'others' }
            ])
        }

        const user_category = await Category.findOne({ "use.user_id": user_id });

        if (!user_category) {
            await Category.updateMany({}, { $push: { use: { value: true, user_id } } });
        }

        const categorys = await Category.find({ "use.user_id": user_id });

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
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;
    const user_id = jwt.decode(token)?.sub;

    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { title, use } = await req.json();

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        if (!use) {
            const user_categorys = await Category.find({ "use.user_id": user_id });

            const count: number = user_categorys.filter(category =>
                category.use.some((prev: { user_id: string, value: boolean }) => prev.user_id === user_id && prev.value === true)
            ).length

            if (count === 2) {
                return NextResponse.json<Props_response>({ status: 200, info: { message: 'Debes tener por lo menos 2 categorias en uso' } });
            }
        }

        const exists_category = await Category.findOne({ title });

        if (!exists_category) {
            return NextResponse.json<Props_response>({ status: 404, info: { message: "Categoria no encontrada" } });
        }

        const category = exists_category.use.find((prev: { user_id: string }) => prev.user_id === user_id);
        category.value = use;

        await exists_category.save();

        return NextResponse.json<Props_response>({ status: 200, info: { message: `Categoria "${title}" ${use ? 'configurada para su uso' : 'fuera de uso'} ` } });
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}