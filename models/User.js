const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            minlength: 1,
            maxlength: 32,
        },
        image: {
            type: String,
            maxlength: 128,
        },
        roles: {
            type: Array,
            default: ['user'],
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            id: this._id,
            roles: this.roles,
        },
        process.env.JWT_SECRET
    )
}

const User = mongoose.model('User', userSchema)

module.exports = User
