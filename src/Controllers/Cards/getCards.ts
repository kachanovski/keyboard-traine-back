import {Request, Response} from "express";

const Card = require('../../Shema/Card')

const getCards = async (req: Request, res: Response) => {
    const {category} = req.query;
    try {
        const categoryF = category ? category : ''

        if (categoryF === '') {
           const cards = await Card.find()
                res.json({
                    message: 'cards',
                    count: cards.length,
                    cards
                })
        } else {
            await Card.find((err, res1) => {
                const filterCards = res1.filter(i => i.category === categoryF)
                res.json({
                    message: 'cards',
                    count: filterCards.length,
                    cards: filterCards
                })
            })
        }
    } catch (e) {
        res.json({
            message: 'Yoops, something went wrong(getCards)'
        })
    }
}

module.exports = getCards