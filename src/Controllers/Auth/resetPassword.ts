import {Request, Response} from "express";
const User = require('./../../Shema/User')
const bCrypt = require("bcrypt");

const resetPassword = async (req: Request, res: Response) => {

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).exec()
        if (!user) {
            res.status(400).json({
                message: 'User not found'
            })
        }

        await User.findByIdAndUpdate(user._id, {password: await bCrypt.hash(password, 8),})
        res.status(200).json({message: 'password update'})

    } catch (e) {
        res.status(500).json({
            message: 'Yoops, something went wrong.'
        })
    }
}

module.exports = resetPassword