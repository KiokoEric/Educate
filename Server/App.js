const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

// MIDDLEWARE

app.use(cors({
    origin: ["https://educate-rouge.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],    
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// MONGODB CONNECTION   

const dbUrl = process.env.MONGODB_URL 

mongoose.connect(dbUrl)
.then(() => console.log("Connected to the database!"))

// IMPORT ROUTES

const UserRoute = require("./Routes/UserRoute");
const QuizRoute = require("./Routes/QuizRoute");  

app.get('/', (req,res) => res.status(200).json({ message: 'Welcome to Educate.' })
app.use("/Quiz", QuizRoute);
app.use("/Users", UserRoute);


app.listen(4000)
