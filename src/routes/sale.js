"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const { isAdmin } = require('../middlewares/permissions')
const sale = require('../controllers/sale')

// URL: /auth

router.route('/')
    .get(sale.list)
    .post(isAdmin, sale.create)


router.route('/:id')
    .get(sale.read)
    .put(isAdmin, sale.update)
    .patch(isAdmin, sale.update)
    .delete(isAdmin, sale.delete)

/* ------------------------------------------------------- */
module.exports = router