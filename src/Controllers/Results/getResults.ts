import {Request, Response} from "express";

const Result = require('./../../Shema/Result')

const getResults = async (req: Request, res: Response) => {
    const {category} = req.query;
    try {
        const categoryF = category ? category : ''
        if (categoryF) {
            const allResults = await Result.find().exec()
            const filterResult = await allResults.filter(result => result.category === categoryF)
            const sortRes = await filterResult.sort(function (a, b) {
                if (a.result.mistakes > b.result.mistakes) {
                    return 1
                }
                if (a.result.mistakes < b.result.mistakes) {
                    return -1
                }
                return 0
            })

            res.status(201).json({
                message: 'Result add',
                data: sortRes
            })
        } else {

            res.status(500).json({
                message: 'Category not found.'
            })
        }
    } catch
        (e) {
        res.status(500).json({
            message: 'Yoops, something went wrong.'
        })
    }
}

module.exports = getResults