import mongoose from 'mongoose'

const Schema = mongoose.Schema

let postSchema = new Schema({
    body: {
        type: String,
        required: true,
        trim: false,
        unique: false
    },
    author:{
        type: String,
        required: true,
        unique: false
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 1
    },
    comments: [{
        id: {
            type: String
        }
    }]
})

export let Post = mongoose.model("Post", postSchema)