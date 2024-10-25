import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectImage from '../../assets/Select.png';
import Select from '../../Components/Common/Select/Select';
import Button from '../../Components/Common/Button/Button';
import { useAppContext } from '../../Components/Context/AppContext';

const QuizSettings: React.FC = () => {
    
    const navigate = useNavigate()

    // USESTATE

    const [Errors, setErrors] = useState<string>("")

    // USEAPP CONTEXT

    const {Category, setCategory , Difficulty, setDifficulty, Type, setType} = useAppContext()

    // SUBMISSION OF QUIZ SETTINGS FUNCTION

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if ( Category === ''|| Difficulty === '' || Type === '' ) {
            setErrors("Ensure all the required fields are filled!")
        }
        else {
            navigate(`/Questions`)
        }
    }

return (
    <div className='flex items-start justify-center h-screen m-auto mt-10 lg:items-center lg:mt-0 md:justify-between md:w-10/12'>
        <section className='hidden md:block'>
            <img src={SelectImage} alt="Select-Image" />
        </section>
        <section>
            <h1 className='capitalize mb-5 text-3xl text-center underline xl:text-left sm:text-4xl'>Select your quiz parameters</h1>
            <form onSubmit={handleSubmit} action="" method="post" className='flex flex-col items-center justify-center gap-10'>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="Category" className='font-bold text-xl underline'>Category</label>
                    <Select SelectStyle='border-b-2 border-black outline-none px-1 py-1 rounded-sm text-black w-80 lg:w-96' Value={Category} onChange={(e: any) => setCategory(e.target.value)}>
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
                    </Select>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="Difficulty" className='font-bold text-xl underline'>Difficulty</label>
                    <Select SelectStyle='border-b-2 border-black outline-none px-1 py-1 rounded-sm text-black w-80 lg:w-96' Value={Difficulty} onChange={(e: any) => setDifficulty(e.target.value)}>
                        <option value="">Choose the difficulty below</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </Select>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="Type" className='font-bold text-xl underline'>Type</label>
                    <Select SelectStyle='border-b-2 border-black outline-none px-1 py-1 rounded-sm text-black w-80 lg:w-96' Value={Type} onChange={(e: any) => setType(e.target.value)}>
                        <option value="">Choose the type below</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </Select>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-bold text-center text-red-700' >{Errors}</p>
                    <Button
                        ButtonText='Submit Parametres'
                        ButtonStyle='bg-Blue cursor-pointer flex items-center justify-center h-8 mt-5 text-center text-lg text-white px-3 py-2 rounded w-48 sm:w-56 hover:bg-Green'
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </section>
    </div>
)
}

export default QuizSettings
