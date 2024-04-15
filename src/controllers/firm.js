"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Firm Controller:

const Firm = require('../models/firm')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "List Firms"
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

        const data = await res.getModelList(Firm, {} )

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Firm),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Create Firm"
        */

        const data = await Firm.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Get Single Firm"
        */

        const data = await Firm.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Update Firm"
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

        // Mevcut firm resimlerini getir:
        const firm = await Firm.findOne({ _id: req.params.id }, { _id: 0, images: 1 })
        // firm.images
        
        for (let file of req.files) {
            // Mevcut firm resimlerine ekle:
            // firm.images.push(file.filename)
            firm.images.push('/uploads/' + file.filename)
        }
        // Firm resimlerini req.body'ye aktar:
        req.body.images = firm.images

        const data = await Firm.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Firm.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Delete Firm"
        */

        const data = await Firm.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}