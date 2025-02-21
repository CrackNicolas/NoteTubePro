import { fileTypeFromBuffer } from "file-type";

import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsNote } from "@/context/types/note";
import { PropsCategory } from "@/context/types/category";
import { PropsResponse } from "@/shared/types/response";

import { fileTransformer, fileEdit, fileDelete } from '@/backend/utils/cloudinary';

import Notes from '@/backend/schemas/note';
import malware from '@/backend/security/anti_malware';

import { AntiMalware } from '@/backend/enums/anti_malware';
import { MessagesNote } from "@/shared/enums/messages/note";
import { ConditionFile } from "@/backend/enums/condition_file";
import { handleApiRequest } from "@/backend/handlers/request";

export async function GET(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const search: PropsNote[] = await Notes.find({ userId });

            return { status: 200, details: search }
        }
    })
}
export async function POST(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const data = await req.formData();
            const categoryPrev = data.get('category');
            const category: PropsCategory = categoryPrev && typeof categoryPrev === 'string' ? JSON.parse(categoryPrev) : null;

            const noteData: any = {
                title: data.get('title'),
                description: data.get('description'),
                category: {
                    title: category.title,
                    icon: category.icon
                },
                priority: data.get('priority'),
                featured: (data.get('featured') === 'SI'),
                userId
            };

            const file = data.get('file') as File;

            if (file) {
                const fileBuffer = Buffer.from(await file.arrayBuffer()) as any;
                const type = await fileTypeFromBuffer(fileBuffer);

                if (!type || !type.mime.startsWith('image/')) return { status: 400, info: { message: MessagesNote.BAD_IMAGE } };

                const responseMalware = await malware({ fileBuffer, type, file });

                if (responseMalware != AntiMalware.FREE) {
                    return {
                        status: 400, info: {
                            message: (responseMalware == AntiMalware.VIRUS) ? MessagesNote.FILE_MALWARE : MessagesNote.FILE_ERROR
                        }
                    }
                }

                const { id, url } = await fileTransformer(file);
                if (!url) return { status: 404, info: { message: MessagesNote.FILE_NOT_FOUND } };

                noteData.file = { id, name: file.name, url };
            }

            const newNote = new Notes(noteData);
            await newNote.save();

            return { status: 201, info: { message: MessagesNote.CREATED } };
        }
    })
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    return handleApiRequest({
        cookies: req.cookies,
        processRequest: async (userId: string): Promise<PropsResponse> => {
            const data = await req.formData();

            const existsNote = await Notes.findById(data.get('_id'));
            if (!existsNote) {
                return { status: 404, info: { message: MessagesNote.NOT_FOUND } };
            }

            const categoryPrev = data.get('category');
            const category: PropsCategory = (categoryPrev && typeof categoryPrev === 'string') ? JSON.parse(categoryPrev) : null;

            existsNote.title = data.get('title');
            existsNote.description = data.get('description');
            existsNote.category = {
                title: category.title,
                icon: category.icon
            };
            existsNote.priority = data.get('priority');
            existsNote.featured = (data.get('featured') === 'SI');
            existsNote.userId = userId;

            const conditionFilePrev = data.get('conditionFile');
            const conditionFile: ConditionFile = (conditionFilePrev && typeof conditionFilePrev === 'string') ? JSON.parse(conditionFilePrev) : null;

            switch (conditionFile) {
                case ConditionFile.MODIFY:
                    const file = data.get('file') as File;
                    const fileBuffer = Buffer.from(await file.arrayBuffer()) as any;
                    const type = await fileTypeFromBuffer(fileBuffer);

                    if (!type || !type.mime.startsWith('image/')) return { status: 400, info: { message: MessagesNote.BAD_IMAGE } };

                    const responseMalware = await malware({ fileBuffer, type, file });

                    if (responseMalware != AntiMalware.FREE) {
                        return {
                            status: 400,
                            info: {
                                message: (responseMalware == AntiMalware.VIRUS) ? MessagesNote.FILE_MALWARE : MessagesNote.FILE_ERROR
                            }
                        }
                    }

                    const { id, url } = await fileEdit(existsNote.file.id, file);
                    if (!url) return { status: 404, info: { message: MessagesNote.NOT_FOUND } };
                    existsNote.file = { id, name: file.name, url };
                    break;
                case ConditionFile.DELETE:
                    await fileDelete([existsNote.file.id]);
                    existsNote.file = undefined;
                    break;
            }

            await existsNote.save();

            return { status: 200, info: { message: MessagesNote.UPDATE } };
        }
    })
}