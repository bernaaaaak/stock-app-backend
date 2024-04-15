"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/purchase:

const { isAdmin } = require('../middlewares/permissions')
const purchase = require('../controllers/purchase')

// URL: /purchase

router.route('/')
    .get(purchase.list)
    .post(isAdmin, purchase.create)


router.route('/:id')
    .get(purchase.read)
    .put(isAdmin, purchase.update)
    .patch(isAdmin, purchase.update)
    .delete(isAdmin, purchase.delete)

/* ------------------------------------------------------- */
module.exports = router