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
            const userCategorys = await Category.find({
                "use": {
                    $elemMatch: {
                        "userId": userId,
                        "value": segment
                    }
                }
            }).select({
                _id: 0,
                title: 1,
                "use.value": 1,
                icon: 1
            });

            const filterCategorys: PropsCategory[] = userCategorys
                .map(category => ({
                    title: category.title,
                    use: category.use[0].value,
                    icon: category.icon
                })
            )
            
            return { status: 200, details: filterCategorys };
        }
    })
}