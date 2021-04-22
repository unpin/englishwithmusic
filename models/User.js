const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            set: (email) => email.toLowerCase(),
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
            required: true,
        },
        image: {
            type: String,
            maxlength: 256,
            default: '',
        },
        roles: {
            type: [String],
            default: ['user'],
        },
    },
    {
        timestamps: true,
    }
)

const signOptions = {
    expiresIn: '7d',
}

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            id: this._id,
            roles: this.roles,
        },
        process.env.JWT_SECRET,
        signOptions
    )
}

userSchema.methods.getPublicProfile = function () {
    return {
        email: this.email,
        name: this.name,
        image: this.image,
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User
