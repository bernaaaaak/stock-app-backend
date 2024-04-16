"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')

// {
//     "username": "admin",
//     "password": "aA*123456",
//     "email": "admin@site.com",
//     "firstName": "admin",
//     "lastName": "admin",
//     "isActive": true,
//     "isStaff": true,
//     "isAdmin": true
// }
// {
//     "username": "staff",
//     "password": "aA*123456",
//     "email": "staff@site.com",
//     "firstName": "staff",
//     "lastName": "staff",
//     "isActive": true,
//     "isStaff": true,
//     "isAdmin": false
// }
// {
//     "username": "test",
//     "password": "aA*123456",
//     "email": "test@site.com",
//     "firstName": "test",
//     "lastName": "test",
//     "isActive": true,
//     "isStaff": false,
//     "isAdmin": false
// }
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        // validate: [
        //     (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
        //     'Password type is not correct.'
        // ],
        // set: passwordEncrypt
        //? Yöntem-1:
        set: (password) => {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
                return passwordEncrypt(password)
            } else {
                throw new Error('Password type is not correct.')
            }
        },
        //? Yöntem-2:
        // set: (password) => {
        //     if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
        //         return passwordEncrypt(password)
        //     } else {
        //         return 'wrong'
        //     }
        // },
        // validate: (password) => (password != 'wrong')
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: [
            (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            'Email type is not correct.'
        ]
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isStaff: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

}, {
    collection: 'users',
    timestamps: true
})

const passwordEncrypt = require('../helpers/passwordEncrypt')

// // "save" olayı "updateOne" için çalışmaz.
// UserSchema.pre(['save', 'updateOne'], function (next) {
//     // console.log('pre(save,update) run.')
//     // console.log(this)

//     // get data from "this" or "this._update"
//     const data = this?._update || this

//     // email@domain.com
//     const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

//     if (isEmailValidated) {

//         console.log('Email OK')

//         if (data?.password) {

//             const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)

//             if (isPasswordValidated) {

//                 console.log('Password OK')

//                 data.password = passwordEncrypt(data.password)

//                 if (this?._update) {

//                     this._update = data
//                     // this._update.password = data.password 

//                 } else {
//                     // this = data // izin vermiyor.
//                     this.password = data.password
//                 }

//                 //? ShortHand:
//                 // // save:
//                 // this.password = data.password = passwordEncrypt(data.password)
//                 // // update:
//                 // this._update = data


//             } else {
//                 next(new Error('Password is not validated.'))
//             }
//         }
//         next()

//     } else {
//         next(new Error('Email is not validated.'))


UserSchema.pre['save', 'updateOne'], function (next) {

    // get data from "this" or "this._update"
    const data = this?._update || this

    // email@domain.com
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if (!isEmailValidated.test(data.email)) {
        next(new Error('Invalid email address'))
    }
    const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)
    if (!isPasswordValidated.test(data.password)) {
        next(new Error('Invalid password'))
    }
    data.password = passwordEncrypt(data.password)

    if (this?._update) {
        
        this._update = data
    }

    next()

    // Model:
    module.exports = mongoose.model('User', UserSchema)