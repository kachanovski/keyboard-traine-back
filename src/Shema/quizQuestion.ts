import {model, Schema} from "mongoose";

const QuizQuestion = new Schema({
        question: {
            type: String,
            require: true,
        },
        quizImgQuestion: {
            type: String,
            default: ''
        },
        answer: {
            right: {
                type: String,
                //required: true
            },
            wrong: {
                type: [String],
               // required: true
            }
        },
        answer_description: {
            type: String,
           // required: true
        },
        category: {
            type: String,
           // require: true
        },
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    }
)

module.exports = model('QuizQuestion', QuizQuestion)