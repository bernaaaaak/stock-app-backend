"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Category Controller:

const Category = require('../models/category')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Categorys"]
            #swagger.summary = "List Categorys"
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

        const data = await res.getModelList(Category, {})

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Category),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {
        /*
            #swagger.tags = ["Categorys"]
            #swagger.summary = "Create Category"
        */

        const data = await Category.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Categorys"]
            #swagger.summary = "Get Single Category"
        */

        const data = await Category.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Categorys"]
            #swagger.summary = "Update Category"
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

        // Mevcut category resimlerini getir:
        const category = await Category.findOne({ _id: req.params.id }, { _id: 0 })
        // category.images


        const data = await Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Category.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Categorys"]
            #swagger.summary = "Delete Category"
        */

        const data = await Category.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}