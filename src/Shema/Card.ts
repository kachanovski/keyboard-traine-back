import { model, Schema } from "mongoose";

const Card = new Schema({
    author: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true
    },
},
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    }
)

module.exports = model('Card', Card)