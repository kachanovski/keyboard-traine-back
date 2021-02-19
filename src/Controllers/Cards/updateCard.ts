import {Request, Response} from "express";

const Card = require('../../Shema/Card')
const jwt = require('jsonwebtoken')
const config = require('config')

const updateCard = async (req: Request, res: Response) => {
    try {
        const token = req.headers.cookie?.substring(6)
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));

        if (!decodeToken.isAdmin) {
            return res.status(500).json({message: 'It is options access only admins'})
        }

        const card_id = req.body.id

        const findCard = await Card.findById(card_id)
        if(!findCard){
            return res.status(500).json({message: 'Dont found card_id'})
        }

        await Card.findByIdAndUpdate(card_id, req.body).exec()
        res.status(200).json({message: 'card updated'})

    } catch (e) {
        res.status(500).json({message: 'Yoops, something went wrong(update cards).'})
    }
}

module.exports = updateCard