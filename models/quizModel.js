const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    question: {
        required: true,
        type: String,
    },
    answers: {
        required: true,
        type: [String],
    },
    correctAnswer: {
        required: true,
        type: Number
    },
    correct: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User'
    },
    faild: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User'
    }
}, {timestamps: true} )

module.exports = mongoose.model("Quiz", quizSchema)