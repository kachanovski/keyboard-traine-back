import {Request, Response} from "express";

const User = require('../../Shema/User')
const jwt = require('jsonwebtoken')
const config = require('config')

const updateUser = async (req: Request, res: Response) => {
    try {
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));

        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }
        console.log(req.body)
        const user_id = req.body.id
        console.log(user_id)

        const findUser = await User.findById(user_id)
        if (!findUser) {
            return res.status(500).json({message: 'Dont found user_id'})
        }
        console.log(findUser)
        await User.findByIdAndUpdate(user_id, req.body).exec()
        res.status(200).json({message: 'user updated'})

    } catch (e) {
        res.status(500).json({message: 'Yoops, something went wrong(update user).'})
    }
}

module.exports = updateUser