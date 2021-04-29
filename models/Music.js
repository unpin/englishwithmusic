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
        singerId: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Singer',
            },
        ],
    },
    {
        timestamps: true,
    }
)

musicSchema.virtual('singers', {
    ref: 'Singer',
    localField: 'singerId',
    foreignField: '_id',
    justOne: false,
})

export default mongoose.model('Music', musicSchema)
