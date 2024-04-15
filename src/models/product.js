"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Order Model:

const ProductsSchema = new mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },

    
    name: {
        type: String,
        trim: true,
        required: true,
    },

    quantity: {
        type: Number,
        default: 1
    },

}, {
    collection: 'products',
    timestamps: true
})

// Model:
module.exports = mongoose.model('Product', ProductsSchema)