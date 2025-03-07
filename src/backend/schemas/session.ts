import { Schema, model, models } from "mongoose";

import { PropsSession } from "@/backend/types/session";

const schemaSession = new Schema<PropsSession>({
    id: {
        type: String,
        require: [true, 'Required id'],
        unique: true,
        trim: true
    },
    status: {
        type: Boolean,
        require: [true, 'Required status']
    },
    lastTime: {
        type: String,
        require: [true, 'Required lastTime'],
        trim: true
    },
    expiret: {
        type: String,
        require: [true, 'Required expiret']
    },
    origin: {
        ipAdress: {
            type: String,
            require: [true, 'Required origin ipAdress'],
            trim: true
        },
        city: {
            type: String,
            require: [true, 'Required origin city'],
            trim: true
        }
    },
    user: {
        name: {
            type: String,
            require: [true, 'Required user name'],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: [true, 'Required user email'],
            unique: true,
            trim: true
        },
        image: {
            type: String,
            require: [true, 'Required user image'],
        },
        lastSignInAt: {
            type: Date,
            require: [true, 'Required user lastSignInAt'],
        },
        rol: {
            type: String,
            require: [true, 'Required user rol'],
        }
    }
},
    {
        timestamps: true
    }
)

export default models.Session || model('Session', schemaSession);