import axios from 'axios';
import Male from '../../assets/Male.avif';
import { useParams } from 'react-router-dom';
import Female from '../../assets/Female.webp';
import Loading from "../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import QuizImage from '../../assets/Question.jpeg';
import Answer from '../../Components/Common/Answer/Answer';
import Button from '../../Components/Common/Button/Button';
import Navigate from '../../Components/Common/Navigate/Navigate';

const MyQuiz:React.FC = () => {

    const { _id } = useParams()

    // USESTATE

    const [Name, setName] = useState<string>('')
    const [Score, setScore] = useState<number>(0);
    const [Questions, setQuestions] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ShowResults, setShowResults] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    // CALLING ON A QUIZ BY ITS ID

    useEffect(() => {

        try {
            axios.get(`https://storykeeper-server.onrender.com/Quiz/${_id}`)
            .then(response => {
                setName(response.data.Name) 
                setQuestions(response.data.Questions) 
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
        catch (error) {
            console.log(error)
        }
    },[])

    // HANDLE ANSWER FUNCTION

    const handleAnswer = (answer: any) => {
        setSelectedAnswer(answer)
        setTimeout(() => {
            if (answer === Questions[currentQuestion].correctAnswer) {
                setScore(prev => prev + 1)
            }
            if (currentQuestion + 1 < Questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
            }
        }, 500)
    };

    // HANDLE NEXT QUESTION FUNCTION

    const handleNextQuestion = () => {
        setSelectedAnswer('');
        if (currentQuestion + 1 < Questions.length) { 
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    }

    // SHOW RESULTS

    if (ShowResults) {
        return (
        <div className='flex flex-col justify-center items-center m-auto mb-5 w-11/12'>
            <h1 className='font-bold mt-5 text-center text-black text-5xl'>Quiz Results</h1>
            <div className='flex items-center justify-center'>
                <figure>
                    <img src={Female} alt="" />
                </figure>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='font-bold mt-5 text-center text-black text-3xl'>You Answered</h2>
                    <h1 className='font-bold mt-5 text-center text-black text-4xl'>{Score} / {Questions.length}</h1>
                    <h2 className='font-bold mt-5 text-center text-black text-3xl'>Questions Correct</h2>
                </div>
                <figure>
                    <img src={Male} alt="" width='400px' />
                </figure>
            </div>
            <div className='flex flex-col-reverse justify-between gap-5 mt-5 sm:gap-52 sm:flex-row'>
                <Navigate
                    Navigation="/Home"
                    NavigateStyle="bg-black cursor-pointer p-2 rounded text-center text-3xl text-white w-64"
                    NavigateText="Back to Home"
                />
                <Navigate
                    Navigation="/Quizzes"
                    NavigateStyle="bg-black cursor-pointer p-2 rounded text-center text-3xl text-white w-64"
                    NavigateText="My Quizzes"
                />
            </div>
        </div>
    );
    }

return (
<div>
    {isLoading ? (
        <div className="flex items-center justify-center mt-10" >
            <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
        </div>
        ) : (
    <div className='flex flex-col items-center justify-center mb-10'>
        <h1 className='hidden lg:block font-bold mt-5 text-center text-black text-4xl'>Quiz Name: {Name} </h1>
        <h2 className='hidden lg:block font-bold mt-5 text-center text-black text-3xl'>Question Number: {currentQuestion + 1} / {Questions.length}</h2>
        <div className='flex justify-center items-center gap-10 px-5'>
            <section className='hidden lg:block lg:w-4/12 xl:w-5/12'>
                <img src={QuizImage} alt=""/>
            </section>
            <section id='Question' className='flex flex-col items-center justify-center m-auto w-12/12 lg:w-8/12'>
                <div className='flex flex-col gap-5 items-center justify-center sm:gap-10 sm:justify-between'>
                    <div className='lg:hidden'>
                        <h1 className='font-bold mt-5 text-center text-black text-4xl'>Quiz Name: {Name} </h1>
                        <h2 className='font-bold mt-5 text-center text-black text-3xl'>Question Number: {currentQuestion + 1} / {Questions.length}</h2>
                    </div>
                    <h1 className='font-bold text-center text-black text-3xl'>{Questions[currentQuestion].Question}</h1>
                    <div className='grid grid-cols-1 items-center justify-center gap-5 m-auto sm:w-12/12 md:w-11/12 sm:grid-cols-2'>
                    { 
                        Questions[currentQuestion].options.sort().map((answer:any, index: number) => (
                            <ul>
                                <Answer 
                                    key={index}
                                    TextStyle='ml-5'
                                    onClick={() => handleAnswer(answer)}
                                    AnswerText={answer}
                                    AnswerStyle={`capitalize cursor-pointer font-bold flex items-center mr-10 px-4 py-2 rounded-sm text-2xl w-80 lg:w-72 xl:w-80 2xl:w-96 ${
                                        selectedAnswer === answer ? 
                                        answer === Questions[currentQuestion].correctAnswer ? 
                                        'bg-green-700 text-black' 
                                        : 'bg-red-700 text-black' 
                                        : 'bg-black text-white'  
                                    }`}
                                    disabled={selectedAnswer !== ''}
                                />
                            </ul>
                        )) 
                    }
                    </div>
                </div>
                <section className='flex justify-center mt-20 w-full'>
                    <Button 
                        onClick={handleNextQuestion}
                        ButtonText='Next Question'
                        ButtonStyle='bg-Blue cursor-pointer p-2 rounded text-center text-2xl text-white w-64 sm:text-3xl hover:bg-Green'
                    />
                </section>
            </section>
        </div>
    </div>
    )}  
    </div>
)
}

export default MyQuiz
