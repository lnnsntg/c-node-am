const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (validator.isEmail(value) === false) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('You must provide a password')
            }
            if (value.includes('password')) {
                throw new Error("The password can not contain 'password'")
            }
            if (!validator.isLength(value, {
                    min: 8
                })) {
                throw new Error("The password must have a minimum of 6 characters")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;