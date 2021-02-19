import {Request, Response} from "express";

const Result = require('./../../Shema/Result')
const jwt = require('jsonwebtoken')
const config = require('config')

const getUserResult = async (req: Request, res: Response) => {
    const {category} = req.query;
    try {
        const categoryF = category ? category : ''
        console.log(categoryF)

        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));

        const userAllResult = await Result.find({user_id: decodeToken._id}).exec()
        const userCategoryResult = await userAllResult.filter(result => result.category === categoryF)

        res.status(201).json({
            message: 'user result in one category',
            data: userCategoryResult
        })
    } catch
        (e) {
        res.status(500).json({
            message: 'Only autorize users, can get personal results'
        })
    }
}

module.exports = getUserResult