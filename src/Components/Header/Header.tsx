import Axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { useCookies } from "react-cookie";
import { IoMdHome } from "react-icons/io";
import Button from '../Common/Button/Button';
import Logo from "../../assets/Educate_Logo.jpg";
import { useGetUserID } from '../Hooks/useGetUserID';

const Header: React.FC = () => {

    const UserID = useGetUserID()

    const [ Name, setName ] = useState("")
    const [ Cookie,setCookie ] = useCookies(["auth_token"]);

    useEffect(() => {
        
        const FetchName  = async() => {
            await Axios.get(`http://localhost:4000/Users/${UserID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        FetchName()

    },[UserID])

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
    }

return (
    <div className='flex items-center justify-between px-2 py-1 shadow-lg mb-1'>
        <Link to="/" className='flex gap-0 items-center justify-center text-black no-underline'>
            <img src={Logo} alt="" width="50px" />
            <h1 className='font-bold text-3xl'>Educate</h1>
        </Link>
        <Link to="/" className='text-black no-underline'>
            <IoMdHome size="1.8rem" color='black' />
        </Link>
        <section className="flex items-center justify-center gap-2" >
            <Link to="/Favourites" className='' >
                <Button ButtonText='Favourites Recipes' ButtonStyle='bg-lightOrange px-3 py-1 rounded text-base text-white' />
            </Link>
            {
                <Link to="/Registration">
                    <Button
                        ButtonText='Sign Up'
                        ButtonStyle='bg-black cursor-pointer text-center text-base text-white px-5 py-1 rounded'
                    />
                </Link>
                }
                {
                !Cookie.auth_token ?
                (
                    <Link to="/Login">
                        <Button
                            ButtonText='Login'
                            ButtonStyle='bg-black cursor-pointer text-center text-base text-white px-5 py-1 rounded'
                        />
                    </Link>
                ) : 
                (
                    <Button
                        ButtonText='Logout'
                        ButtonStyle='bg-black cursor-pointer h-8 text-center text-base text-white px-3 py-1 rounded'
                        onClick={Logout}
                    />
                )
            }
            <Link to={`/Profile`}>
                <FaUser size="2rem" className="bg-black text-white cursor-pointer px-1.5 py-1.5 rounded-full" />
            </Link>
            { UserID ? <h4 className="font-bold flex flex-col text-center"><span>Welcome</span>{Name}</h4> : null }
        </section>
    </div>
)
}

export default Header
