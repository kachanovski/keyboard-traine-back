import {Request, Response} from "express";

const User = require('../../Shema/User')
const jwt = require('jsonwebtoken')
const config = require('config')

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.id
        console.log(user_id)
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));
        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }
        try{
            await User.findById(user_id).exec()
        } catch (e)  {
            return res.status(500).json({message: 'Dont found user_id'})
        }

        await User.findByIdAndDelete(user_id).exec()
        res.status(200).json({message: 'user deleted'})

    } catch (e) {
        res.status(500).json({message: 'Yoops, something went wrong(delete user).'})
    }
}

module.exports = deleteUser