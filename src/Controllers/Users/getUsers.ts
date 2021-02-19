import {Request, Response} from "express";

const User = require('../../Shema/User.ts')
const jwt = require('jsonwebtoken')
const config = require('config')

const getUsers = async (req: Request, res: Response) => {
    try {
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));
        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }
        const users = await User.find()
        res.json({
            message: 'users',
            countUsers: users.length,
            users
        })
    } catch
        (e) {
        res.json({
            message: 'Yoops, something went wrong(get users)'
        })
    }
}

module.exports = getUsers