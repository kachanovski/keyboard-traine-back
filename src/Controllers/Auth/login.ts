import {Request, Response} from "express";
import {validateAuth} from "../../Middleware/validate";

const User = require('./../../Shema/User')
const jwt = require('jsonwebtoken')
const bCrypt = require("bcrypt");
const config = require('config')

const login = async (req: Request, res: Response) => {

    const {email, password, rememberMe} = req.body;
    if (validateAuth(req, res)) {
        try {
            const user = await User.findOne({email}).exec()
            if (!user) {
                res.status(400).json({
                    message: 'User not found'
                })
            } else if (!(await bCrypt.compare(password, user.password))) {
                res.status(400).json({
                    message: 'Incorrect password'
                })
            } else {

                const token = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                        isAdmin: user.isAdmin
                    },
                    config.get('jwtSecret'),
                    {expiresIn: '15m'}
                )

                try {
                    const newUser = await User.findByIdAndUpdate(
                        user._id,
                    ).exec()
                    if (!newUser) {
                        res.status(500).json({
                            message: "login/user maybe toten?"
                        })
                    } else {
                        res.cookie('token', token)
                            .status(201).json({
                            data: {
                                id: user._id,
                                email: user.email,
                                rememberMe: user.rememberMe,
                                isAdmin: user.isAdmin
                            },
                            message: 'Login success',
                            statusCode: 201,
                        });
                    }

                } catch (e) {
                    res.status(400).json({message: 'Yoops, something went wrong(login)'})
                }
            }
        } catch (e) {
            res.status(500).json({
                message: 'Yoops, something went wrong.'
            })
        }
    }
}

module.exports = login