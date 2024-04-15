"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const { isAdmin } = require('../middlewares/permissions')
const product = require('../controllers/product')

// URL: /auth

router.route('/')
    .get(product.list)
    .post(isAdmin, product.create)


router.route('/:id')
    .get(product.read)
    .put(isAdmin, product.update)
    .patch(isAdmin, product.update)
    .delete(isAdmin, product.delete)

/* ------------------------------------------------------- */
module.exports = router