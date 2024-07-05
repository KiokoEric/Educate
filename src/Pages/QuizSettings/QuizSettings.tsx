import React from 'react';

const QuizSettings: React.FC = () => {
return (
    <div className='flex justify-between m-auto w-3/4' >
        <section>
            <h1 className='font-bold text-4xl'>Select your quiz parameters</h1>
        </section>
        <section>
            <form action="" method="post" >
                <div>
                    <label htmlFor="Category">Category</label>
                    <select name="" id="" className='outline-none px-2 py-1 text-black w-11/12'>
                        <option value="">Search among the options below</option>
                        <option value="">Any Category</option>
                        <option value="">General Knowledge</option>
                        <option value="">Entertainment: Books</option>
                        <option value="">Entertainment: Film</option>
                        <option value="">Entertainment: Music</option>
                        <option value="">Entertainment: Musicals & Theatres</option>
                        <option value="">Entertainment: Television</option>
                        <option value="">Entertainment: Video Games</option>
                        <option value="">Entertainment: Board Games</option>
                        <option value="">Science & Nature</option>
                        <option value="">Science: Computers</option>
                        <option value="">Science: Mathematics</option>
                        <option value="">Mythology</option>
                        <option value="">Sports</option>
                        <option value="">Geography</option>
                        <option value="">History</option>
                        <option value="">Politics</option>
                        <option value="">Art</option>
                        <option value="">Celebrities</option>
                        <option value="">Animal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Difficulty</label>
                    <select name="" id="">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Type</label>
                    <select name="" id="">
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
            </form>
        </section>
    </div>
)
}

export default QuizSettings