import {Request, Response} from "express";
import {validateAuth} from "../../Middleware/validate";

const bCrypt = require("bcrypt");
const User = require('./../../Shema/User')

const register = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if (validateAuth(req, res)) {
        try {
            const oldUser = await User.findOne({email}).exec()
            if (oldUser) {
                res.status(400).json({
                    message: 'email exists'
                })
            } else {
                const user = await User.create(
                    {
                        email,
                        password: await bCrypt.hash(password, 8),
                        rememberMe: false,
                        isAdmin: false,
                        avatar: ''
                    }
                )

                const addedUser = {...user._doc};

                delete addedUser.password; // ne visilai parol` na front!!!!!

                res.status(201).json({
                    message: 'User created',
                    body: addedUser
                });
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Yoops, something went wrong.'
            })
        }
    }

}

module.exports = register
