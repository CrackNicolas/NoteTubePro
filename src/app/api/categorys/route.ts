import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsResponse } from "@/shared/types/response";
import { PropsCategory } from "@/context/types/category";
import { MessageCategory } from '@/shared/enums/messages/category';
import { handleApiRequest } from '@/backend/handlers/request';

import Category from '@/backend/schemas/category';

export async function GET(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
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

            return { status: 200, details: filterCategorys };
        }
    });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const { title, use } = await req.json();

            if (!use) {
                const userCategorys = await Category.find({ "use.userId": userId });

                const count: number = userCategorys.filter(category =>
                    category.use.some((prev: { userId: string, value: boolean }) => prev.userId === userId && prev.value === true)
                ).length;

                if (count === 2) return { status: 200, info: { message: MessageCategory.DENIED } };
            }

            const existsCategory = await Category.findOne({ title });

            if (!existsCategory) return { status: 404, info: { message: MessageCategory.NOT_FOUND } };

            const category = existsCategory.use.find((prev: { userId: string }) => prev.userId === userId);
            category.value = use;

            await existsCategory.save();

            return { status: 200, info: { message: (use) ? MessageCategory.SUCCESS_USE : MessageCategory.SUCCESS_USE_NOT } };
        }
    })
}