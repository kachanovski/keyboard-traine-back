import {Request, Response} from "express";

const QuizQuestion = require('../../Shema/quizQuestion')
const jwt = require('jsonwebtoken')
const config = require('config')

const updateQuestion = async (req: Request, res: Response) => {
    try {
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));

        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }

        const quiz_id = req.body.id
        const findCard = await QuizQuestion.findById(quiz_id)
        if(!findCard){
            return res.status(500).json({message: 'Dont found quiz_id'})
        }

        await QuizQuestion.findByIdAndUpdate(quiz_id, req.body).exec()
        res.status(200).json({message: 'card updated'})

    } catch (e) {
        res.status(500).json({message: 'Yoops, something went wrong(update question).'})
    }
}

module.exports = updateQuestion