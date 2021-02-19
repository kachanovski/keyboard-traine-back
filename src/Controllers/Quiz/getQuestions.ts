import {Request, Response} from "express";
const QuizQuestion = require('../../Shema/quizQuestion')

const getQuizQuestion = async (req:Request, res:Response) => {

    try {
        const quizQuestions = await QuizQuestion.find()
       
        res.status(201).json({
            message: 'QuizQuestions',
            quizQuestions
        })
    } catch (e) {
        res.status(500).json({
            message: 'Yoops, something went wrong(get quiz questions.)'
        })
    }
}

module.exports = getQuizQuestion