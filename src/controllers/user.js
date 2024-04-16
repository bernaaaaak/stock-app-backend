"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// User Controller:

const User = require('../models/user')
const sendMail = require('../helpers/sendMail')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
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

        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
        */

        const data = await User.create(req.body)

        /* SendMail */
        sendMail(
            data.email, // to
            'Welcome', // subject
            // Message
            `
                <h1>Welcome ${data.username}</h1>
                <p>Welcome to our system</p>
            `
        )

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

        // Manage only self-record.
        let filter = {}
        if (!req.user.isAdmin) {
            // const data = await User.findOne({ _id: req.params.id, _id: req.user._id })
            filter = { _id: req.user._id }
        }

        const data = await User.findOne({ _id: req.params.id, ...filter })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
    #swagger.tags = ["Users"]
    #swagger.summary = "Update User"
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            "username": "test",
            "password": "1234",
            "email": "test@site.com",
            "firstName": "test",
            "lastName": "test",
        }
    }
*/

        // Sadece kendi kaydını güncelleyebilir:
        // const customFilters = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }
        const customFilters = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.params._id } // differ of object and string 

        // Yeni kayıtlarda admin/staff durumunu değiştiremez:
        if (!req.user?.isAdmin) {
            delete req.body.isStaff
            delete req.body.isAdmin
        }

        // // Manage only self-record.
        // let filter = {}
        // if (!req.user.isAdmin) {
        //     filter = { _id: req.user._id }
        // }

        const data = await User.updateOne({ _id: req.params.id, ...filter }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const data = await User.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}