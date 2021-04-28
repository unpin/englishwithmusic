import mongoose from 'mongoose'

const musicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            maxlength: 256,
            default: '',
        },
        videoURL: {
            type: String,
            maxlength: 256,
        },
        lyrics: {
            type: [Object],
            default: [],
        },
        artist: {
            type: mongoose.Types.ObjectId,
            ref: 'Artist',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Music', musicSchema)
