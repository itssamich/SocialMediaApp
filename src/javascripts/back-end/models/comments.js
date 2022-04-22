import mongoose from 'mongoose'

const Schema = mongoose.Schema

let commentSchema = new Schema({
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
    post:{
        type: String,
        required: true,
        unique: false
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
})

export let Comment = mongoose.model("Comment", commentSchema)