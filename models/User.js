import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
            minlength: 8,
            maxlength: 256,
            select: false,
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
            enum: ['admin', 'user'],
            default: ['user'],
            required: true,
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

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export default mongoose.model('User', userSchema)
