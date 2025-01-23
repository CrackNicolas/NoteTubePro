import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsResponse } from "@/context/types/response";
import { PropsCategory } from "@/context/types/category";

import { conectDatabase } from "@/backend/utils/db";

import Category from '@/backend/schemas/category';
import autentication from '@/backend/logic/autentication';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const count: number = await Category.countDocuments();
        if (count === 0) {
            await Category.create([
                { title: 'Proyecto', use: [{ value: true, userId }], icon: 'proyects' },
                { title: 'Trabajo', use: [{ value: true, userId }], icon: 'briefcase' },
                { title: 'Inversion', use: [{ value: true, userId }], icon: 'investment' },
                { title: 'Estudios', use: [{ value: true, userId }], icon: 'studies' },
                { title: 'Personal', use: [{ value: true, userId }], icon: 'person' },
                { title: 'Viajes', use: [{ value: true, userId }], icon: 'plane' },
                { title: 'Historias', use: [{ value: true, userId }], icon: 'stories' },
                { title: 'Peliculas', use: [{ value: true, userId }], icon: 'film' },
                { title: 'Musicas', use: [{ value: true, userId }], icon: 'music' },
                { title: 'Otros', use: [{ value: true, userId }], icon: 'others' }
            ])
        }

        const userCategory = await Category.findOne({ "use.userId": userId });

        if (!userCategory) await Category.updateMany({}, { $push: { use: { value: true, userId } } });

        const categorys = await Category.find({ "use.userId": userId });

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
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const { title, use } = await req.json();

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        if (!use) {
            const userCategorys = await Category.find({ "use.userId": userId });

            const count: number = userCategorys.filter(category =>
                category.use.some((prev: { userId: string, value: boolean }) => prev.userId === userId && prev.value === true)
            ).length;

            if (count === 2) return NextResponse.json<PropsResponse>({ status: 200, info: { message: 'Debes tener por lo menos 2 categorias en uso' } });
        }

        const existsCategory = await Category.findOne({ title });

        if (!existsCategory) return NextResponse.json<PropsResponse>({ status: 404, info: { message: "Categoria no encontrada" } });

        const category = existsCategory.use.find((prev: { userId: string }) => prev.userId === userId);
        category.value = use;

        await existsCategory.save();

        return NextResponse.json<PropsResponse>({ status: 200, info: { message: `Categoria "${title}" ${use ? 'configurada para su uso' : 'fuera de uso'} ` } });
    } catch (error:unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}