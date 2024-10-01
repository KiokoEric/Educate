import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import Input from '../../../Components/Common/Input/Input';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from "../../../assets/ProfileImage.webp";
import Button from "../../../Components/Common/Button/Button";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Profile:React.FC = () => {

    const { userID } = useParams()
    const navigate = useNavigate()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [Email, setEmail] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // DISPLAYING AND HIDING OF PASSWORDS

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // CALLING ON THE USER'S DETAILS

    useEffect(() => {

        const FetchUser =() => {
            try{
                axios.get(`http://localhost:4000/Users/${userID}`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((Data) => {
                    setName(Data.data.Name)
                    setEmail(Data.data.Email)
                    setPassword(Data.data.Password) 
                })
            }
            catch (Error){
                console.log(Error)
            }
        }  
        
        FetchUser()

    }, [])

    // EDIT USER FUNCTION

    const EditUser = () => {
        navigate(`/EditProfile/${userID}`)
    } 

    // DELETE USER FUNCTION

    const DeleteUser = () => {
        navigate(`/DeleteProfile`)
    }

return (
    <div className='grid grid-cols-1 gap-5 items-center justify-center mt-1 sm:grid-cols-2'>
        <figure className='hidden sm:block'>
            <img src={ProfileImage} alt="" />
        </figure>
        <form encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2 m-auto w-11/12'>
            <div className='my-10'>
                <h2 className='text-5xl'><span className='text-green-800'>E</span>ducate</h2>
                <p className='mt-5 text-2xl text-center' >My Profile</p>
            </div>
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Name'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 lg:w-96' 
                Value={Name}        
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Email'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 lg:w-96'
                Value={Email}
            />
            <Input 
                ContainerStyle = 'flex flex-col w-80 sm:w-96'
                Label = 'Password'
                type={showPassword ? 'text' : 'password'}
                LabelStyle = 'font-bold'
                inputStyle = 'h-5 outline-none truncate px-1 py-2 text-black w-80 lg:w-96'
                TextStyle="border-black border-b flex flex-row"
                Value={Password}
                Children={showPassword ? <FontAwesomeIcon icon={faEye} className="underline" onClick={handleTogglePassword} /> : <FontAwesomeIcon icon={faEyeSlash} className="underline" onClick={handleTogglePassword} />  }
            />
            <div className='flex gap-5 sm:gap-16 mt-5'>
                <Button
                    onClick={EditUser}
                    ButtonStyle="bg-black cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-40"
                    ButtonText="Edit Details"
                    Children={<FontAwesomeIcon icon={faPenToSquare} />}
                />
                <Button
                    onClick={DeleteUser}
                    ButtonStyle="bg-black cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-40"
                    ButtonText="Delete My Profile"
                    Children={<FontAwesomeIcon icon={faTrash} />}
                />
            </div>
        </form>
    </div>
)
}

export default Profile
