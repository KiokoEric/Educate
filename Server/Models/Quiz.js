const mongoose = require("mongoose");
const QuizSchema = new mongoose.Schema({ 
    Name: {
        type: String,
        required:true
    },
    Description: {
        type: String,
        required:true
    },
    Questions: [{
        Question: String,
        options: [String],
        correctAnswer: String
    }],
    userOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }
})

module.exports = mongoose.model("Quiz", QuizSchema)