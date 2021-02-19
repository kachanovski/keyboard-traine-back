import {Request, Response} from "express";

const Card = require('../../Shema/Card')
const jwt = require('jsonwebtoken')
const config = require('config')

const deleteCard = async (req: Request, res: Response) => {
    try {
        const card_id = req.body.id

        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));
        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }
        try{
            await Card.findById(card_id).exec()
        } catch (e)  {
            return res.status(500).json({message: 'Dont found card_id'})
        }

        await Card.findByIdAndDelete(card_id).exec()
        res.status(200).json({message: 'card deleted'})

    } catch (e) {
        res.status(500).json({message: 'Yoops, something went wrong(delete cards).'})
    }
}

module.exports = deleteCard