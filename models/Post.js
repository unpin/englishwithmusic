import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 256,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            maxlength: 256,
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Post', postSchema)
