const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (validator.isEmail(value) === false) {
                throw new Error('Email is not valid');
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
                throw new Error('You must provide a password');
            }
            if (value.includes('password')) {
                throw new Error("The password can not contain 'password'");
            }
            if (!validator.isLength(value, {
                min: 8
            })) {
                throw new Error("The password must have a minimum of 6 characters");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//-----------------------------------------------------------

// Generate Token JWT
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse', { expiresIn: '7 days' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//-----------------------------------------------------------

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login, pass not match');
    }
    return user;
};

//-----------------------------------------------------------

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;