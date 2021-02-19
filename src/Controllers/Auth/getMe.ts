import { Request, Response } from "express";
const jwt = require('jsonwebtoken')
const config = require('config')

export const getMe = async (req: Request, res: Response) => {

    const token = req.headers.cookie?.substring(6)
    if (!token)
        return res.status(401).send("Access denied...No token provided...");
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.body = decoded;
        return res.status(200).json({
            message: 'success',
            data: {
                id: decoded._id,
                email: decoded.email,
                isAdmin: decoded.isAdmin
            }
        })
    } catch (er) {
        res.clearCookie("token");
        return res.status(400).send(er.message);
    }
};
