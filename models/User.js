import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: [true, 'E_EMAIL_REQUIRED'],
            unique: [true, 'E_EMAIL_NOT_UNIQUE'],
        },
        password: {
            type: String,
            required: [true, 'E_PASSWORD_REQUIRED'],
            minlength: [8, 'E_PASSWORD_LENGTH'],
            maxlength: [256, 'E_PASSWORD_LENGTH'],
            select: false,
        },
        name: {
            type: String,
            minlength: [1, 'E_NAME_LENGTH'],
            maxlength: [32, 'E_NAME_LENGTH'],
            required: [true, 'E_NAME_REQUIRED'],
        },
        image: {
            type: String,
            maxlength: [256, 'E_IMAGE_LENGTH'],
            default: '',
        },
        roles: {
            type: [String],
            enum: ['admin', 'user'],
            default: ['user'],
            required: [true, 'E_ROLE_REQUIRED'],
        },
    },
    {
        timestamps: true,
    }
)

userSchema.path('email').validate(function (v) {
    return validator.isEmail(v)
}, 'E_INVALID_EMAIL')

const signOptions = {
    expiresIn: '7d',
}

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            image: this.image,
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

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export default mongoose.model('User', userSchema)
