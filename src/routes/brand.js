"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/brand:

const brand = require('../controllers/brand')
const { isAdmin } = require('../middlewares/permissions')

/* ------------------------------------------------------- */
//* UPLOAD
//? $ npm i multer
// https://expressjs.com/en/resources/middleware/multer.html
// multer module ile "form-data" verileri kabul edebiliriz. Yani dosya yükleme yapılabilir.

// const multer = require('multer')
// const upload = multer({
//     // dest: './uploads',
//     storage: multer.diskStorage({
//         destination: './uploads',
//         filename: function(req, file, returnCallback) {
//             // returnCallback(error, filename)
//             // returnCallback(null, 'qadir.jpg')
//             // console.log(file)
//             // returnCallback(null, file.originalname)
//             returnCallback(null, Date.now() + '-' + file.originalname)
//         }
//     })
// })

const upload = require('../middlewares/upload')

/* ------------------------------------------------------- */

// URL: /brands

router.route('/')
    .get(brand.list)
    // .post(isAdmin, brand.create)
    // .post(isAdmin, upload.single('fileInputName'), brand.create)
    // .post(isAdmin, upload.array('fileInputName'), brand.create) // recommended.
    .post(isAdmin, upload.array('images'), brand.create) // recommended.
    // .post(isAdmin, upload.any(), brand.create) // not recommended.

router.route('/:id')
    .get(brand.read)
    .put(isAdmin, upload.array('images'), brand.update)
    .patch(isAdmin, upload.array('images'), brand.update)
    .delete(isAdmin, brand.delete)

/* ------------------------------------------------------- */
module.exports = router