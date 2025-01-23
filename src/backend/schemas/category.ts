import { Schema, model, models } from "mongoose";

import { PropsCategory } from "@/backend/types/category";

const schemaCategory = new Schema<PropsCategory>({
    title: {
        type: String,
        require: [true, 'Required title'],
        unique: true,
        trim: true
    },
    use: [{
        value: {
            type: Boolean,
            require: [true, 'Required use value']
        },
        userId: {
            type: String,
            require: [true, 'Required use userId'],
            trim: true
        }
    }],
    icon: {
        type: String,
        require: [true, 'Required icon']
    }
},
    {
        timestamps: true
    }
)

export default models.Category || model('Category', schemaCategory);