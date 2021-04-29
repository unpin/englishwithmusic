import mongoose from 'mongoose'

const singerSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Singer', singerSchema)
