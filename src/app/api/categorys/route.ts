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
            const categoryExists = await Category.exists({ "use.userId": userId });

            if (!categoryExists) {
                await Category.insertMany([  //insertMany es mas rrapido que usar create debido a que insertMany hace una sola consolta por lote
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
                ]);
            }

            await Category.updateMany(
                { "use.userId": { $ne: userId } },
                { $addToSet: { use: { value: true, userId } } }
            );

            const userCategorys = await Category.find({ "use.userId": userId }).select({
                _id: 0,
                title: 1,
                "use.$": 1,  // Usamos `$` para traer solo el elemento dentro de `use` que corresponde al userId
                icon: 1
            });

            const filterCategorys: PropsCategory[] = userCategorys.map(category => ({
                title: category.title,
                use: category.use[0].value,
                icon: category.icon
            }));

            return { status: 200, details: filterCategorys };
        }
    })
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const { title, use } = await req.json();

            if (!use) {
                const activeCategoriesCount = await Category.countDocuments({
                    "use": {
                        $elemMatch: {
                            "userId": userId,
                            "value": true
                        }
                    }
                });

                if (activeCategoriesCount === 2) return { status: 200, info: { message: MessageCategory.DENIED } };
            }

            const updateCategory = await Category.updateOne(
                { title, "use.userId": userId },
                { $set: { "use.$.value": use } }
            )

            if (updateCategory.modifiedCount === 0) return { status: 404, info: { message: MessageCategory.NOT_FOUND } };

            return { status: 200, info: { message: (use) ? MessageCategory.SUCCESS_USE : MessageCategory.SUCCESS_USE_NOT } };
        }
    })
}