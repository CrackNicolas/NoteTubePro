import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { PropsResponse } from '@/shared/types/response';
import { PropsCategory } from '@/context/types/category';
import { handleApiRequest } from '@/backend/handlers/request';

import Category from '@/backend/schemas/category';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: boolean } }): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const userCategorys = await Category.find({ "use.userId": userId });

            const categorys = userCategorys.filter(category =>
                category.use.some((prev: { userId: string, value: boolean }) => prev.userId === userId && prev.value == (segment ? true : false))
            )

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
    })
}