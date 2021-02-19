import {Request, Response} from "express";

const logOut = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token")
            .status(201).json({message: 'logOut success'})
    } catch (e) {
        console.log(e)
    }

}
module.exports = logOut