import React from 'react';
import { MdQuiz } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";

const Home:React.FC = () => {
return (
    <div id='Home' className=' flex flex-col justify-center text-black'>
        <div className='flex flex-col items-center justify-center gap-20'>
            <section className='m-auto w-3/4'>
                <h1 className='mb-10 text-6xl text-center'>Welcome to <span className='text-green-800'>E</span>ducate</h1>
                <p className='text-xl text-center'>Educate is the ultimate quiz application designed to test your knowledge across various topics, from history to pop culture, science to sports, and also allowing you to create your own quiz.</p>
            </section>
            <section className='flex gap-10'>
                <Link to={'/Settings'} className='cursor-pointer'>
                    <MdQuiz size="6.5rem" />
                    <figcaption className='text-center'>
                        <p>Start Quiz</p>
                    </figcaption>
                </Link>
                <Link to={"/"} className='cursor-pointer'>
                    <IoIosCreate size="6.5rem" />
                    <figcaption className='text-center'>
                        <p>Create Quiz</p>
                    </figcaption>
                </Link>
            </section>
        </div>
    </div>
)
}

export default Home