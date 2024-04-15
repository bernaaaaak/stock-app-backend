"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const { isAdmin } = require('../middlewares/permissions')

const category = require('../controllers/category')

// URL: /auth

router.route('/')
    .get(category.list)
    .post(isAdmin, category.create)


router.route('/:id')
    .get(category.read)
    .put(isAdmin, category.update)
    .patch(isAdmin, category.update)
    .delete(isAdmin, category.delete)

/* ------------------------------------------------------- */
module.exports = router