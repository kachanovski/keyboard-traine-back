import {Request, Response} from "express";

const User = require('../../Shema/User')
const jwt = require('jsonwebtoken')
const config = require('config')

const updateProfilePhoto = async (req: Request, res: Response) => {

    try {
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));

        const updateUser = await User.findByIdAndUpdate({user_id: decodeToken._id}, {avatar: 'ava'})
        console.log(updateUser)
        res.status(201).json({
            message: 'QuizQuestion added',
            quiz: updateUser,
            statusCode: 201
        })
    } catch (e) {
        res.status(500).json({
            message: 'Yoops, something went wrong(update photo).'
        })
    }
}

module.exports = updateProfilePhoto