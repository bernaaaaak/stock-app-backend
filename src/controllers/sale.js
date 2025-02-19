"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Sale Controller:

const Sale = require('../models/sale')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Sale, {})

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Sale),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {
        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sale"
        */

        const data = await Sale.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sale"
        */

        const data = await Sale.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
        */

        // console.log(req.file) // upload.single()
        // console.log(req.files) // upload.array() || upload.any()
        /* 
            [
                {
                    fieldname: 'images',
                    originalname: 'papagan.jpeg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: './uploads',
                    filename: '1711659209665-papagan.jpeg',
                    path: 'uploads/1711659209665-papagan.jpeg',
                    size: 7270
                }
            ]
        */

        // Mevcut sale resimlerini getir:
        const sale = await Sale.findOne({ _id: req.params.id }, { _id: 0 })
        // sale.images


        const data = await Sale.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Sale.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Sale"
        */

        const data = await Sale.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}