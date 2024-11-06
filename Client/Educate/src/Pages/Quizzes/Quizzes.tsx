import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import loadingGif from "../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import QuizImage from "../../assets/Quiz_Image.avif";
import Output from "../../Components/Common/Output/Output";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Heading from "../../Components/Common/Heading/Heading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserID } from "../../Components/Hooks/useGetUserID";

const Quizzes: React.FC = () => {

    const userID = useGetUserID();
    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Quizzes, setQuizzes] = useState<[]>([]) 
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // CALLING ON THE USER'S CREATED QUIZZES

    useEffect(() => {

        const fetchQuizzes = async () => {
            await axios.get(`http://localhost:4000/Quiz/${userID}/Quiz`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setQuizzes(Response.data)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }

        fetchQuizzes() 

    }, [userID])

    // DELETE QUIZ

    const handleDelete= (id: any) => {
        axios.delete(`http://localhost:4000/Quiz/${id}`, {
            headers: { authorization: Cookie.auth_token } 
        }) 
        .then(() => {
            window.location.reload()
        })
    }

return (
    <div className="mb-10" >
        <Heading
            idName='Quizzes'
            ContainerStyle='flex flex-col items-center justify-center gap-5 mb-8 text-center text-white'
            Heading='My Quizzes'
            HeadingStyle='font-bold text-5xl'
        />
        <section className='grid grid-cols-1 items-start justify-center gap-8 m-auto w-11/12 sm:grid-cols-3'>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center m-auto w-screen">
                    <img src={loadingGif} alt="Loading Gif..." id="Loading" />
                </div>
            ) : (
            (Quizzes.length > 0) ?  
            Quizzes.map((Quiz : any) => { 
            return (
            <div className="flex flex-col items-center justify-center" >
                <Link key={Quiz.index}  to={`/MyQuiz/${Quiz._id}`} className='flex flex-col gap-3 text-black no-underline'> 
                    <Output
                        figureStyle='flex flex-col gap-5 mb-5'
                        image={QuizImage}
                        imageStyle='rounded'
                        TitleStyle='capitalize font-bold text-black text-center text-3xl'
                        Title={Quiz.Name}
                        Text={Quiz.Description}
                        TextStyle="text-center"
                    />
                </Link>
                <div className="flex gap-3 items-center justify-center">
                    <div id="DeleteQuiz">
                        <FontAwesomeIcon icon={faTrash} className="bg-blue-600 cursor-pointer font-bold p-3 rounded-full text-xl hover:bg-Green" onClick={() => handleDelete(Quiz._id)} /> 
                    </div>
                </div>
            </div>
            )})
            : <h2 className='font-bold m-auto text-red-700 text-center text-5xl w-screen'>No Results Found</h2>
            )}
        </section>
    </div> 
)
}   

export default Quizzes
