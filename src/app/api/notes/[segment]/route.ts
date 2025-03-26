import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Query } from 'mongoose';
import { PropsResponse } from '@/shared/types/response';
import { PropsDeleteNote, PropsNote } from '@/context/types/note';

import { query } from '@/backend/logic/query';
import { ValueOrder } from '@/shared/enums/note/order';
import { fileDelete } from '@/backend/utils/cloudinary';
import { MessagesNote } from '@/shared/enums/messages/note';
import { handleApiRequest } from '@/backend/handlers/request';
import { PropsParamsSearch } from '@/shared/types/search';

import Notes from '@/backend/schemas/note';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    const criteria = JSON.parse(segment) as PropsParamsSearch;

    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            let queryBuilder: any = Notes.find(query(userId, criteria)).lean().select(
                { "updatedAt": 0, "__v": 0 }
            )

            if (criteria.order === ValueOrder.UPWARD) {
                queryBuilder = queryBuilder.sort({ title: 1 });
            }
            if (criteria.order === ValueOrder.DESCENDING) {
                queryBuilder = queryBuilder.sort({ title: -1 });
            }
            if (criteria.order === ValueOrder.MOST_RECENT) {
                queryBuilder = queryBuilder.sort({ createdAt: -1 });
            }
            if (criteria.order === ValueOrder.LEAST_RECENT) {
                queryBuilder = queryBuilder.sort({ createdAt: 1 });
            }

            const notes: PropsNote[] = await queryBuilder;

            return { status: 200, details: notes }
        }
    })
}

export async function DELETE(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (): Promise<PropsResponse> => {
            const notes = JSON.parse(segment);

            const resultMongodb = await Notes.deleteMany(
                { _id: { $in: notes.map((note: PropsDeleteNote) => note._id) } }
            )

            if (resultMongodb.deletedCount == 0) return { status: 500, info: { message: MessagesNote.DELETE_FAILED } }

            await fileDelete(notes.filter((note: PropsDeleteNote) => note.file !== undefined).map((note: PropsDeleteNote) => note.file));

            return { status: 200, info: { message: (notes.length === 1) ? MessagesNote.DELETE : MessagesNote.DELETES } }
        }
    })
}