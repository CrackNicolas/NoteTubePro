import { fileTypeFromBuffer } from "file-type";

import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { PropsNote } from "@/context/types/note";
import { PropsCategory } from "@/context/types/category";
import { PropsResponse } from "@/context/types/response";

import { conectDatabase } from "@/backend/utils/db";
import { fileTransformer, fileEdit, fileDelete } from '@/backend/utils/cloudinary';

import Notes from '@/backend/schemas/note';
import malware from '@/backend/security/anti_malware';
import autentication from '@/backend/logic/autentication';

import { AntiMalware } from '@/backend/enums/anti_malware';
import { ConditionFile } from "@/backend/enums/condition_file";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const search: PropsNote[] = await Notes.find({ userId });

        return NextResponse.json<PropsResponse>({ status: 200, data: search });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}
export async function POST(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const data = await req.formData();

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
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

            if (!type || !type.mime.startsWith('image/')) {
                return NextResponse.json<PropsResponse>({ status: 400, info: { message: "Solo se permiten archivos de imagen" } });
            }

            const responseMalware = await malware({ fileBuffer, type, file });

            if (responseMalware != AntiMalware.FREE) {
                return NextResponse.json<PropsResponse>(
                    {
                        status: 400, info: {
                            message: (responseMalware == AntiMalware.VIRUS) ? "Archivo con virus" : "Error al analizar el archivo"
                        }
                    }
                );
            }

            const { id, url } = await fileTransformer(file);
            if (!url) {
                return NextResponse.json<PropsResponse>({ status: 404, info: { message: "Archivo no encontrado" } });
            }

            noteData.file = { id, name: file.name, url };
        }

        const newNote = new Notes(noteData);
        await newNote.save();

        return NextResponse.json<PropsResponse>({ status: 201, info: { message: `La nota "${data.get('title')}" fue creada con exito` } });
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return NextResponse.json<PropsResponse>({ status: 400, info: { message: `La nota "${error.keyValue.title}" ya existe` } })
        } else {
            return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
        }
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const userId = autentication(req.cookies);
    if (!userId) return NextResponse.json<PropsResponse>({ status: 401, info: { message: "Credenciales invalidas" } });

    const data = await req.formData();

    const connection: boolean = await conectDatabase();
    if (!connection) return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const existsNote = await Notes.findById(data.get('_id'));
        if (!existsNote) {
            return NextResponse.json<PropsResponse>({ status: 404, info: { message: "Nota no encontrada" } });
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

                if (!type || !type.mime.startsWith('image/')) {
                    return NextResponse.json<PropsResponse>({ status: 400, info: { message: "Solo se permiten archivos de imagen" } });
                }

                const responseMalware = await malware({ fileBuffer, type, file });

                if (responseMalware != AntiMalware.FREE) {
                    return NextResponse.json<PropsResponse>({
                        status: 400, info: {
                            message: (responseMalware == AntiMalware.VIRUS) ? "Archivo con virus" : "Error al analizar el archivo"
                        }
                    })
                }

                const { id, url } = await fileEdit(existsNote.file.id, file);
                if (!url) return NextResponse.json<PropsResponse>({ status: 404, info: { message: "Archivo no encontrado" } });
                existsNote.file = { id, name: file.name, url };
                break;
            case ConditionFile.DELETE:
                await fileDelete([existsNote.file.id]);
                existsNote.file = undefined;
                break;
        }

        await existsNote.save();

        return NextResponse.json<PropsResponse>({ status: 200, info: { message: `La nota "${existsNote.title}" fue modificada` } });
    } catch (error: unknown) {
        return NextResponse.json<PropsResponse>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}