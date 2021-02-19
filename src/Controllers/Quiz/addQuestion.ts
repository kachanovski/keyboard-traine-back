import {Request, Response} from "express";
const QuizQuestion = require('../../Shema/quizQuestion')

const addQuizQuestion = async (req: Request, res: Response) => {

    try {
        const quizQuestion = {
            question: req.body.question,
            imgQuestion: req.file ? req.file.path : '',
            answer: {
                right: req.body.answer.right,
                wrong: req.body.answer.wrong
            },
            answer_description: req.body.answer_description,
            category: req.body.category,
        }
        await QuizQuestion.create(quizQuestion)

        res.status(201).json({
            message: 'QuizQuestion added',
            quiz: quizQuestion,
            statusCode: 201
        })
    } catch (e) {
        res.status(500).json({
            message: 'Yoops, something went wrong(add quiz question).'
        })
    }
}

module.exports = addQuizQuestion