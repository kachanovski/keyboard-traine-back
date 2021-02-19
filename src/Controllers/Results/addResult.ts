import {Request, Response} from "express";

const Result = require('./../../Shema/Result')
const jwt = require('jsonwebtoken')
const config = require('config')

const addResult = async (req: Request, res: Response) => {

    try {
        const result = req.body;
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));

       await Result.create({
            user_id: decodeToken._id,
            category: result.category,
            result: result.result
        })
        res.status(201).json({
            message: 'Result add',
            statusCode: 201
        })
    } catch (e) {
        res.status(500).json({
            message: 'Only autorize users, can save personal results'
        })
    }
}

module.exports = addResult