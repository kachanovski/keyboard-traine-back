import {Request, Response} from "express";
const Card = require('../../Shema/Card')

const addCard = async (req:Request, res:Response) => {
   
    try {
        const card = req.body;

        await Card.create(card)
       
        res.status(201).json({
            message: 'Card added',
            statusCode: 201
        })
    } catch (e) {
        res.status(500).json({
            message: 'Yoops, something went wrong.'
        })
    }
}

module.exports = addCard