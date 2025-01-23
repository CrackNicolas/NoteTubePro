import { Schema, model, models } from "mongoose";

import { PropsNote } from "@/backend/types/note";

const schemaNotes = new Schema<PropsNote>({
    title: {
        type: String,
        require: [true, 'Required title'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Required description'],
        unique: true,
        trim: true
    },
    category: {
        title: {
            type: String,
            require: [true, 'Required title category']
        },
        icon: {
            type: String,
            require: [true, 'Required icon category']
        }
    },
    priority: {
        type: String,
        require: [true, 'Required priority'],
        enum: ['Alta', 'Media', 'Baja']
    },
    featured: {
        type: Boolean,
        require: [true, 'Required featured']
    },
    file: {
        id: {
            type: String,
            require: [true, 'Required file id'],
            trim: true
        },
        name: {
            type: String,
            require: [true, 'Required file name'],
            trim: true
        },
        url: {
            type: String,
            require: [true, 'Required file url'],
            trim: true
        }
    },
    userId: {
        type: String,
        require: [true, 'Required userId'],
        trim: true
    }
},
    {
        timestamps: true
    }
)

export default models.Notes || model('Notes', schemaNotes);