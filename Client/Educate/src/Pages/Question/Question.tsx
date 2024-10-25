import axios from 'axios';
import Male from '../../assets/Male.avif';
import Female from '../../assets/Female.webp';
import Loading from "../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import QuizImage from '../../assets/Question.jpeg';
import Button from '../../Components/Common/Button/Button';
import Answer from '../../Components/Common/Answer/Answer';
import Navigate from '../../Components/Common/Navigate/Navigate';
import { useAppContext } from '../../Components/Context/AppContext';

const Question:React.FC = () => {

    const {Category, Difficulty, Type} = useAppContext()

    // USESTATE HOOK

    const [Score, setScore] = useState<number>(0);
    const [Questions, setQuestions] = useState<any[]>([{}]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ShowResults, setShowResults] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    // CALLING ON A QUIZ BASED ON THE QUIZ SETTINGS

    useEffect(() => {

        try {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${Category}&difficulty=${Difficulty}&type=${Type}`)
            .then(response => {
                setQuestions(response.data.results) 
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
            if (answer === Questions[currentQuestion].correct_answer) {
                setScore(prev => prev + 1)
            }
            if (currentQuestion + 1 < 10) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
            }
        }, 500);
    };

    // HANDLE NEXT QUESTION FUNCTION

    const handleNextQuestion = () => {
        setSelectedAnswer('');
        if (currentQuestion + 1 < Questions.length ) {
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
                    <h1 className='font-bold mt-5 text-center text-black text-4xl'>{Score}/ 10</h1>
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
                    Navigation="/Settings"
                    NavigateStyle="bg-black cursor-pointer p-2 rounded text-center text-3xl text-white w-64"
                    NavigateText="New game"
                />
            </div>
        </div>
    );
    }

    // OPTIONS VARIABLE

    const Options = Questions[currentQuestion]

return ( 
    <div>
    {isLoading ? (
        <div className="flex items-center justify-center mt-10" >
            <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
        </div>
        ) : (
    <div className='flex flex-col items-center justify-center mb-10'>
        <h1 className='hidden lg:block font-bold mt-5 text-center text-black text-4xl'>Category: {Questions[currentQuestion].category}</h1>
        <h2 className='hidden lg:block font-bold mt-5 text-center text-black text-3xl'>Question Number: {currentQuestion + 1} / {Questions.length}</h2>
        <div className='flex items-center gap-10 m-auto w-11/12 sm:px-5 lg:justify-center'>
            <section className='hidden lg:block lg:w-4/12 xl:w-5/12'>
                <img src={QuizImage} alt=""/>
            </section>
            <section id='Question' className='flex flex-col items-center justify-center m-auto w-12/12 lg:w-8/12'>
                <div className='flex flex-col gap-5 items-center justify-center sm:gap-10 sm:justify-between'>
                    <div className='lg:hidden'>
                        <h1 className='font-bold mt-5 text-center text-black text-4xl'>Category: {Questions[currentQuestion].category} </h1>
                        <h2 className='font-bold mt-5 text-center text-black text-3xl'>Question Number: {currentQuestion + 1} / {Questions.length}</h2>
                    </div>
                    <h1 className='font-bold text-center text-black text-3xl'>{Questions[currentQuestion].question}</h1>
                    <div className='grid grid-cols-1 items-center justify-center gap-5 m-auto sm:grid-cols-2 sm:w-12/12 md:w-11/12 '>
                        { 
                        [...Options.incorrect_answers, Questions[currentQuestion].correct_answer].sort().map((answer:any, index: number) => (
                            <Answer 
                                key={index}
                                TextStyle='ml-5' 
                                onClick={() => handleAnswer(answer)}
                                AnswerText={answer}
                                AnswerStyle={`capitalize cursor-pointer font-bold flex items-center mr-10 px-4 py-2 rounded-sm text-2xl w-80 lg:w-72 xl:w-80 2xl:w-96 ${
                                    selectedAnswer === answer ? 
                                    answer === Options.correct_answer ? 
                                    'bg-green-500 text-black' 
                                    : 'bg-red-500 text-black' 
                                    : 'bg-black text-white'  
                                }`} 
                                disabled={selectedAnswer !== ''}
                            />
                        )) 
                        }
                    </div>
                </div> 
                <section className='flex justify-center mt-20 w-full'>
                    <Button 
                        onClick={handleNextQuestion}
                        ButtonText='Next Question'
                        ButtonStyle='bg-Blue cursor-pointer p-1.5 rounded-sm text-center text-xl text-white w-64 sm:text-3xl hover:bg-Green'
                    />
                </section>
            </section>
        </div>
    </div>
    )}  
    </div>
)
}

export default Question
