const dotenv = require('dotenv');
const express = require('express');
const QuizRoute = express.Router();
const jwt = require("jsonwebtoken");
const Quiz = require("../Models/Quiz.js");
const cookieParser = require("cookie-parser");

QuizRoute.use(cookieParser())
dotenv.config();

const myPassword = process.env.Password

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, myPassword , (err) => {     
        if (err) {
            return res.sendStatus(403); 
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

// ADDING A QUIZ 

QuizRoute.post("/AddQuiz", verifyToken ,async (req, res) => {
    const Quizzes = new Quiz(req.body)

    try {
        const SavedQuiz = await Quizzes.save() 
        res.send(SavedQuiz)
    } catch (error) {
        console.error(error)
    }
})

// GETTING ALL THE QUIZZES CREATED BY ALL THE USERS

QuizRoute.get("/AllQuizzes", async (req, res) => {    
    try{
        const AllQuizzes = await Quiz.find() 
        res.json(AllQuizzes)
    }
    catch(err) { 
        res.send(err)  
    }
})

// GETTING ALL THE QUIZZES CREATED BY A SINGLE USER BY THEIR USER ID

QuizRoute.get('/:userId/Quiz', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Quizzes = await Quiz.find({ userOwner: userId });
        res.json(Quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Quiz.' }); 
    }
});

// UPDATING A QUIZ BASED ON THE QUIZ ID

QuizRoute.put("/:id", async (req, res) => {
    try{
        const Quizzes = await Quiz.findByIdAndUpdate(req.params.id, req.body)
        res.json(Quizzes)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETING A QUIZ BASED ON THE QUIZ ID

QuizRoute.delete("/:id", async (req, res) => {
    try{
        const Quizzes = await Quiz.findByIdAndDelete(req.params.id) 
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    } 
})

// GETTING A QUIZ BY ITS ID

QuizRoute.get('/:id', async (req, res) => {
    try {
    const Quizzes = await Quiz.findById(req.params.id);
    if (!Quizzes) {
        return res.status(404).json({ message: 'Quiz is not found' });
    }
    res.json(Quizzes);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = QuizRoute