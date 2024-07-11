import axios from 'axios';
import React, { useState } from 'react';
import Button from '../Common/Button/Button';

export const QuizSettings: React.FC = () => {

    const [Category, setCategory] = useState('')
    const [Difficulty, setDifficulty] = useState('')
    const [Type, setType] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.get(`https://opentdb.com/api.php?amount=10&category=${Category}&difficulty=${Difficulty}&type=${Type}`)
    }

    const SubmitParameters = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
    
        axios.get(`https://opentdb.com/api.php?amount=10&category=${Category}&difficulty=${Difficulty}&type=${Type}`)
    }

return (
    <div className='flex items-center justify-between h-screen m-auto w-3/4'>
        <section>
            <h1 className='capitalize font-bold text-4xl'>Select your quiz parameters</h1>
        </section>
        <section>
            <h1 className='mb-5 text-4xl underline'>Quiz Parameters</h1>
            <form onSubmit={handleSubmit} action="" method="post" className='flex flex-col gap-10'>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="Category" className='underline'>Category</label>
                    <select id="" className='border-b-2 border-black outline-none px-1 py-1 rounded-sm text-black w-80' onChange={e => setCategory(e.target.value)} required>
                        <option value="">Search among the options below</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animal</option>
                    </select>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="Difficulty" className='underline'>Difficulty</label>
                    <select id="" className='border-b-2 border-black outline-none px-1 py-1 rounded-sm text-black w-80' onChange={e => setDifficulty(e.target.value)} required>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="Type" className='underline'>Type</label>
                    <select id="" className='border-b-2 border-black outline-none px-1 py-1 rounded-sm text-black w-80' onChange={e => setType(e.target.value)} required>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
                <div className='flex items-center justify-center'>
                    <Button
                        ButtonText='Submit Parametres'
                        ButtonStyle='bg-green-700 cursor-pointer h-8 mt-5 text-center text-base text-white px-3 py-1 rounded w-1/2'
                        onClick={SubmitParameters}
                    />
                </div>
            </form>
        </section>
    </div>
)
}
