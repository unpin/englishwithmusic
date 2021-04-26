import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

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

export default mongoose.model('User', userSchema)
