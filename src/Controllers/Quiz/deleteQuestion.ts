import {Request, Response} from "express";

const QuizQuestion = require('../../Shema/quizQuestion')
const jwt = require('jsonwebtoken')
const config = require('config')

const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const quiz_id = req.body.id

        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));
        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }
        try{
            await QuizQuestion.findById(quiz_id).exec()
        } catch (e)  {
            return res.status(500).json({message: 'Dont found quiz_id'})
        }

        await QuizQuestion.findByIdAndDelete(quiz_id).exec()
        res.status(200).json({message: 'quiz question was deleted'})

    } catch (e) {
        res.status(500).json({message: 'Yoops, something went wrong(delete quiz).'})
    }
}

module.exports = deleteQuestion