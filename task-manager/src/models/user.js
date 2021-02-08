const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email is not valid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(pass) {
            if (pass.length <= 6) {
                throw new Error('Password must be longer than 6 characters')
            }
            if (pass.toLowerCase() === "password") {
                throw new Error ('Password can not be the word "Password"')
            }
        }
    }
})

module.exports = User