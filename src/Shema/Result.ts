import {model, Schema} from "mongoose";

const Result = new Schema({
        user_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        category: {
            type: String,
            required:true
        },
        result: {
            type: Object,
            required:true
        },
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    }
)

module.exports = model('Result', Result)