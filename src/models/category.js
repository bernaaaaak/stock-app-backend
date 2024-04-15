"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Order Model:

const CategoriesSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
    },

}, {
    collection: 'categories',
    timestamps: true
})

// Model:
module.exports = mongoose.model('Category', CategoriesSchema)