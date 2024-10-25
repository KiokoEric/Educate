import axios from "axios";
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { FaTrash } from "react-icons/fa6";
import Input from "../../Components/Common/Input/Input";
import Button from '../../Components/Common/Button/Button';
import TextArea from "../../Components/Common/TextArea/TextArea";
import { useGetUserID } from "../../Components/Hooks/useGetUserID";

const Create:React.FC = () => {

    const userID = useGetUserID();
    const [Cookie,_] = useCookies(["auth_token"])

    // USESTATE

    const [Name, setName] = useState<string>('')
    const [Error, setError] =useState<string>('')
    const [Success, setSuccess] = useState<string>('')
    const [Questions, setQuestions] = useState<any>([])
    const [userOwner, setUserOwner] = useState<any>(userID)
    const [Description, setDescription] = useState<string>('')
    const [correctAnswer, setCorrectAnswer] = useState<string>('')
    const [currentQuestion, setCurrentQuestion] = useState<string>('')
    const [options, setOptions] = useState<string[]>(['', '', '', ''])

    // ADD NEW QUESTION FUNCTION

    const addNewQuestion = () => {
        if (currentQuestion && options.every(option => option) && correctAnswer) {
            setQuestions([...Questions, { Question: currentQuestion, options, correctAnswer }])
            setCorrectAnswer('');
            setCurrentQuestion('');
            setOptions(['', '', '', '']);
        } 
        else {
            setError("Ensure all the fields are filled!")
        }
    }

    // HANDLE OPTION CHANGE FUNCTION

    const handleOptionChange = (index: any, value: any) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    // DELETE QUESTION FUNCTION

    const deleteQuestion = (index: any) => {
        const updatedQuestions = Questions.filter((_: any , i: any )=> i !== index);
        setQuestions(updatedQuestions);
    };

    // SUBMIT QUIZ FUNCTION

    const SubmitQuiz = async (e: any) => {
        e.preventDefault()

        const data = {
            Name, Description, Questions, userOwner
        }
        try {
            await axios.post("http://localhost:4000/Quiz/AddQuiz", data, {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => {
                setSuccess('Quiz has been successfully created.') 
            })
        } catch (error) {
            console.log(error)
        }
    };

return (
    <div className='flex flex-col gap-8 items-center justify-between m-auto mt-10 mb-10 w-11/12 xl:flex-row xl:gap-0 xl:items-start xl:w-10/12'>
        <form method="post" encType="multipart/form-data" className='flex flex-col items-center justify-center gap-2'>
            <h1 className='font-bold mb-10 text-center text-4xl underline'>Create Quiz</h1>
            <div className='flex flex-col gap-2'>
                <Input 
                    ContainerStyle = 'flex flex-col gap-1'
                    Label = 'Quiz Name'
                    LabelStyle = 'font-bold'
                    Placeholder="Quiz Name"
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                    Value={Name}
                    Change={(e: any) => setName(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <TextArea 
                    ContainerStyle = 'flex flex-col gap-2'
                    Label = 'Quiz Description'
                    LabelStyle = 'font-bold'
                    Placeholder="Quiz Description"
                    inputStyle = 'border-black border-b h-20 outline-none truncate px-1 py-1 text-black w-80 sm:w-96'   
                    Value={Description}
                    Change={(e: any) => setDescription(e.target.value)}
                />
            </div>
            <h2 className='font-bold mt-10 underline'>Quiz Questions</h2>
            <section className='flex flex-col items-center justify-center gap-2'>
                <div className='flex flex-col gap-2' >
                    <TextArea 
                        ContainerStyle = 'flex flex-col gap-2'
                        Label = 'Question'
                        LabelStyle = 'font-bold'
                        Placeholder="Quiz Question"
                        inputStyle = 'border-black border-b h-20 outline-none truncate px-1 py-1 text-black w-80 sm:w-96'   
                        Value={currentQuestion}
                        Change={(e: any) => setCurrentQuestion(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                <h2 className='font-bold mt-5 text-center underline'>Quiz Answers</h2>
                {options.map((option, index) => (
                    <Input 
                        Placeholder={`Option ${index + 1}`}
                        inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                        Value={option}
                        Change={(e: any) => handleOptionChange(index, e.target.value)}
                    />
                ))}
                </div>
                <h2 className='font-bold mt-5 underline'>Correct Answer</h2>
                <div className='mt-4'>
                    <Input 
                        Placeholder="Correct answer"
                        inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                        Value={correctAnswer}
                        Change={(e: any) => setCorrectAnswer(e.target.value)}
                    />
                </div>
                <p className="font-bold mt-3 text-center text-red-700">{Error}</p>
                <Button
                    onClick={addNewQuestion}
                    ButtonStyle='bg-Blue cursor-pointer h-8 mt-10 text-center text-lg text-white px-3 py-1 rounded w-48 hover:bg-Green'
                    ButtonText='Add New Question'
                />
            </section>
        </form>
        {(Questions.length > 0) ? (
        <div className='flex flex-col items-center m-auto sm:w-5/12'>
            <h1 className='font-bold mb-10 text-left text-4xl underline'>Created Questions</h1>
            <div className='flex flex-col items-start' >
                {Questions.map((Question: any, index: any) => (
                    <div key={index} className="mb-4">
                    <h3 className="font-bold text-xl">{index + 1}. {Question.Question}</h3>
                    <ul className="list-disc pl-6 text-lg">
                        {Question.options.map((option: any, optionIndex: any) => (
                        <li key={optionIndex}>{option}</li>
                        ))}
                </ul>
                <p className="text-lg text-gray-500">Correct Answer:{Question.correctAnswer}</p> 
                <div id="Delete" className='flex justify-end'>
                    <FaTrash size='1.2rem' color='red' className='cursor-pointer' onClick={() => deleteQuestion(index)} />
                </div>
            </div>
                ))}
            </div>
            <p className="font-bold text-green-600 text-center" >{Success}</p>
            <Button
                onClick={SubmitQuiz}
                ButtonStyle='bg-Blue cursor-pointer h-8 mt-10 text-center text-lg text-white px-3 py-1 rounded w-48 hover:bg-Green'
                ButtonText='Submit Quiz'
            />
        </div>
        ) : ""}
    </div>
)
}

export default Create
