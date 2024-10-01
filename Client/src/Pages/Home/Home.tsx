import React from 'react';
import { MdQuiz } from "react-icons/md";
import Quiz from '../../assets/Quiz.jpg';
import { IoIosCreate } from "react-icons/io";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import Figure from '../../Components/Common/Figure/Figure';

const Home:React.FC = () => {
return (
    <div id='Home' className='flex flex-col items-center justify-start sm:flex-row sm:justify-center mt-5 text-black'>
        <div className='hidden sm:block' >
            <img src={Quiz} alt="" />
        </div>
        <div className='flex flex-col items-center justify-center'>
            <section className='m-auto mb-5 w-11/12'>
                <h1 className='mb-10 text-6xl text-center'>Welcome to <span className='text-Green'>E</span>ducate</h1>
                <p className='m-auto text-xl text-center w-10/12'>Educate is the ultimate quiz application designed to test your knowledge across various topics, from history to pop culture, science to sports, and also allowing you to create your own quiz.</p>
            </section>
            <section className='flex gap-3 sm:gap-10'>
                <Figure 
                    Navigation={'/Settings'}
                    children={<MdQuiz size="6.5rem" className='HomeIcons' />}
                    NavigateText='Start Quiz'
                />
                <Figure 
                    Navigation={'/Create'}
                    children={<IoIosCreate size="6.5rem" className='HomeIcons' />}
                    NavigateText='Create Quiz'
                />
                <Figure 
                    Navigation={'/Quizzes'}
                    children={<BsFillPatchQuestionFill size="6.5rem" className='HomeIcons' />}
                    NavigateText='My Quizzes'
                />
            </section>
        </div>
    </div>
)
}

export default Home
