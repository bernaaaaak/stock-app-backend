"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/firm:

const firm = require('../controllers/firm')
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

// URL: /firms

router.route('/')
    .get(firm.list)
    // .post(isAdmin, firm.create)
    // .post(isAdmin, upload.single('fileInputName'), firm.create)
    // .post(isAdmin, upload.array('fileInputName'), firm.create) // recommended.
    .post(isAdmin, upload.array('images'), firm.create) // recommended.
    // .post(isAdmin, upload.any(), firm.create) // not recommended.

router.route('/:id')
    .get(firm.read)
    .put(isAdmin, upload.array('images'), firm.update)
    .patch(isAdmin, upload.array('images'), firm.update)
    .delete(isAdmin, firm.delete)

/* ------------------------------------------------------- */
module.exports = router