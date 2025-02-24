import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsResponse } from '@/shared/types/response';
import { PropsDeleteNote, PropsNote } from '@/context/types/note';

import { query } from '@/backend/logic/query';
import { fileDelete } from '@/backend/utils/cloudinary';
import { MessagesNote } from '@/shared/enums/messages/note';
import { handleApiRequest } from '@/backend/handlers/request';

import Notes from '@/backend/schemas/note';

export async function GET(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const notes: PropsNote[] = await Notes.find(query(userId, segment)).lean().select({
                "updatedAt": 0,
                "__v": 0
            });

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