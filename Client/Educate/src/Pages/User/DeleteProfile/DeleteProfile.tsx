import axios from "axios";
import React from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Components/Common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const DeleteProfile:React.FC = () => {

    const userID = useGetUserID()
    const navigate = useNavigate()
    const [Cookie,setCookie] = useCookies(["auth_token"]) 

    // DELETE USER FUNCTION

    const DeleteUser = (id: any) => {
        try{
            axios.delete(`https://storykeeper-server.onrender.com/Users/Delete/${id}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                navigate("/Registration")
                setCookie("auth_token", "");
                window.localStorage.clear()
            })
        }
        catch (Error){
            console.log(Error)
        }
    }

return (
    <div className='grid grid-cols-1 gap-5 items-center justify-center m-auto mt-5 text-center w-11/12'>
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className='font-bold text-5xl text-center text-black'>We are sorry to see you go, but hope to see you again!</h1>
            <Button
                onClick={()=>DeleteUser(userID)}
                ButtonStyle="bg-Blue cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-40 hover:bg-black"
                ButtonText="Delete My Profile"
                Children={<FontAwesomeIcon icon={faTrash} />}
            /> 
        </div>
    </div>
)
}

export default DeleteProfile
