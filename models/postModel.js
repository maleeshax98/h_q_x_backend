const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    img: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema)